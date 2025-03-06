import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridEngine } from 'grid-engine';
import auth from '../../utils/auth.js';
import BattleInterface from './BattleInterface';

export const BattleScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const enemyId = queryParams.get('enemyId');
    const [battleLog, setBattleLog] = useState([]);
    const [turnOrder, setTurnOrder] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [charactersState, setCharactersState] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [enemiesState, setEnemiesState] = useState([]);
    const [battleCompleted, setBattleCompleted] = useState(false);
    const [xpGain, setXpGain] = useState(0);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const getParty = async () => {
            try {
                const response = await fetch(`/api/party/${username}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer: ${auth.getToken()}`,
                        "Content-Type": "application/json",
                    }
                });
    
                const data = await response.json();
                const party = data.map(character => ({ ...character, health: character.stats.HP }));
                setCharactersState(party);
            } catch (error) {
                console.error('Failed to fetch party:', error);
            }
        };
        getParty();

        const getEnemies = async () => {
            try {
                const response = await fetch(`/api/enemy/${username}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer: ${auth.getToken()}`,
                        "Content-Type": "application/json",
                    }
                });
    
                const data = await response.json();
                setEnemies(data);
            } catch (error) {
                console.error('Failed to fetch enemies:', error);
            }
        };
        getEnemies();
    }, []);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            plugins: {
                scene: [
                    {
                        key: "gridEngine",
                        plugin: GridEngine,
                        mapping: "gridEngine",
                    },
                ],
            },
            width: 1000,
            height: 600,
            pixelArt: true,
            parent: 'phaser-game',
            scene: [BattleScene],
        };

        const game = new Phaser.Game(config);

        game.scene.start('BattleScene', { enemyId, setEnemiesState });

        return () => game.destroy(true);
    }, [enemyId]);

    useEffect(() => {
        // Set active enemies based on enemyId
        const activeEnemies = enemies.filter(enemy => enemy.name.toLowerCase().includes(enemyId.toLowerCase()));
        const enemiesWithIds = activeEnemies.flatMap((enemy, index) => {
            return Array.from({ length: enemy.count || 1 }, (_, i) => ({
                ...enemy,
                id: `${enemy.name}-${index}-${i}`,
                health: enemy.stats.HP
            }));
        });
        setEnemiesState(enemiesWithIds);
    }, [enemyId]);

    useEffect(() => {
        // Determine turn order based on speed
        const allCharacters = [...charactersState, ...enemiesState];
        allCharacters.sort((a, b) => b.stats.Speed - a.stats.Speed);
        setTurnOrder(allCharacters);
    }, [enemiesState]);

    useEffect(() => {
        // If it's an enemy's turn, make them attack after a delay
        if (enemiesState.some(enemy => enemy.name === turnOrder[currentTurn]?.name)) {
            const enemy = turnOrder[currentTurn];
            const randomAbility = enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
            const randomTarget = charactersState[Math.floor(Math.random() * charactersState.length)];
            
            const attackTimeout = setTimeout(() => {
                handleAttack(enemy.name, randomAbility.name, randomTarget.id);
            }, 2000); // 1 second delay

            return () => clearTimeout(attackTimeout);
        }
    }, [currentTurn]);

    const handleAttack = (attackerName, attackName, targetId) => {
        console.log('handleAttack called with:', { attackerName, attackName, targetId });
        // Find the attacker
        const attacker = turnOrder.find(character => character.name === attackerName);
        if (!attacker) {
            console.error('Invalid attacker:', attackerName);
            return;
        }

        // Find the target enemy using the targetId
        const target = turnOrder.find(enemy => enemy.id === targetId);
        if (!target) {
            console.error('Invalid target:', targetId);
            return;
        }

        // Get the ability used for the attack
        const ability = attacker.abilities.find(ability => ability.name === attackName);
        const damage = ability ? ability.damage : 0;

        // Log the attack in the battle log
        setBattleLog(prevLog => [
            ...prevLog,
            `${attacker.name} used ${attackName} on ${target.name} for ${damage} damage`
        ]);

        // Reduce target's health
        target.health -= damage;

        // Check if the battle is over
        const allCharactersDead = charactersState.every(character => character.health <= 0);
        const allEnemiesDead = enemiesState.every(enemy => enemy.health <= 0);

        if (allCharactersDead || allEnemiesDead) {
            setBattleLog(prevLog => [
                ...prevLog,
                allCharactersDead ? "All characters are dead. Game Over." : "All enemies are dead. Victory!"
            ]);

            if (allEnemiesDead) {
                handleLevelUp(charactersState, enemiesState);

                fetch(`/api/enemy/${username}/${enemyId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer: ${auth.getToken()}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({alive: false}),
                })
                .catch(error => console.log(error));
            }
            setBattleCompleted(true);
            return;
        }

        // Move to the next turn
        const nextTurn = (currentTurn + 1) % turnOrder.length;
        setCurrentTurn(nextTurn);
    };

    const handleLevelUp = (characters, enemies) => {
        const xpThresholds = [15, 45, 90, 150, 180, 230];
        let enemyXP = enemies.reduce((acc, enemy) => acc + enemy.xp, 0);
        setXpGain(enemyXP);

        const levelUp = (character) => {
            character.level++;
            character.stats.HP += 50;
            character.stats.Speed += character.level;
            character.stats.Attack += character.level;
            character.stats.Defense += character.level;
            character.stats.Magic += character.level;
            character.stats.Resist += character.level;
        };
    
        characters.forEach((character) => {
            character.experience += enemyXP;
            while (character.experience >= xpThresholds[character.level - 1]) {
                levelUp(character);
            }
            const updateCharacter = async () => {
                try {
                    await fetch(`/api/party/${username}/${character.name}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer: ${auth.getToken()}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({level: character.level, stats: character.stats, experience: character.experience}),
                    });
                } catch (error) {
                    console.error('Failed to update party:', error);
                }
            };
            updateCharacter();
        });
    };

    const handleLeaveBattle = () => {
        navigate('/world');
    };

    return (
        <div>
            <div id="phaser-game"></div>
            <BattleInterface
                characters={charactersState}
                enemies={enemiesState}
                onAttack={handleAttack}
                battleLog={battleLog}
                currentTurn={turnOrder[currentTurn]?.name}
            />
            {battleCompleted && (
                <div className="battle-completion">
                    <h3>Battle Completed!</h3>
                    <p>XP Gained: {xpGain}</p>
                    <button onClick={handleLeaveBattle}>Leave Battle</button>
                </div>
            )}
        </div>
    );
};

export const BattleScene = class extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        // add in correct items to load
        this.load.image('skeleton', '../src/assets/enemySprite/skeleton.png');
        this.load.image('vampirate', '../src/assets/enemySprite/vampirate.png');
        this.load.image('iceElf', '../src/assets/enemySprite/iceElf.png');
        this.load.image('iceBear', '../src/assets/enemySprite/iceBear.png');
        this.load.image('grandma', '../src/assets/enemySprite/grandma.png');
        this.load.image('kitten', '../src/assets/enemySprite/kitten.png');
        this.load.image('stan', '../src/assets/enemySprite/battleStan.png');
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('danny', '../src/assets/playerSprite/danny.png');
        this.load.image('tyler', '../src/assets/playerSprite/tyler.png');
        this.load.image('tiles', '../src/assets/images/dungeon-tileset.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/dungeon.json');
    }

    create(data) {
        const { enemyId, setEnemiesState } = data;

        this.cameras.main.setZoom(.80);
        const tilemap = this.make.tilemap({ key: "tilemap" });

        console.log('Tilemap:', tilemap);
        console.log('Tilemap layers:', tilemap.layers);

        const tileset = tilemap.addTilesetImage("32x32 Dungeon", "tiles");

        // Create layers using layer names
        const floorLayer = tilemap.createLayer('Floor', tileset, 0, 0);
        const wallLayer = tilemap.createLayer('Walls', tileset, 0, 0);
        const wallsidesLayer = tilemap.createLayer('Side Walls and Pillars', tileset, 0, 0);

        // Player sprite
        const sprites = {
            baileigh: this.add.sprite(0, 0, 'baileigh').setScale(2),
            colton: this.add.sprite(0, 0, 'colton').setScale(2),
            danny: this.add.sprite(0, 0, 'danny').setScale(2),
            tyler: this.add.sprite(0, 0, 'tyler').setScale(2),
        };

        const characterLevels = {
            // these are just placeholders for now, will be updated with actual values
            baileigh: [
                { level: 1, maxHealth: 150 },
                { level: 2, maxHealth: 200 },
                { level: 3, maxHealth: 250 },
                { level: 4, maxHealth: 300 },
                { level: 5, maxHealth: 350 },
                { level: 6, maxHealth: 400 }
            ],
            colton: [
                { level: 1, maxHealth: 150 },
                { level: 2, maxHealth: 200 },
                { level: 3, maxHealth: 250 },
                { level: 4, maxHealth: 300 },
                { level: 5, maxHealth: 350 },
                { level: 6, maxHealth: 400 }
            ],
            danny: [
                { level: 1, maxHealth: 150 },
                { level: 2, maxHealth: 200 },
                { level: 3, maxHealth: 250 },
                { level: 4, maxHealth: 300 },
                { level: 5, maxHealth: 350 },
                { level: 6, maxHealth: 400 }
            ],
            tyler: [
                { level: 1, maxHealth: 150 },
                { level: 2, maxHealth: 200 },
                { level: 3, maxHealth: 250 },
                { level: 4, maxHealth: 300 },
                { level: 5, maxHealth: 350 },
                { level: 6, maxHealth: 400 }
            ],
        };

        const enemySprite = [];

        const createEnemy = (spriteKey, health, xp, count = 1) => {
            for (let i = 0; i < count; i++) {
                console.log(`Creating enemy: ${spriteKey} ${i + 1}`);
                const sprite = this.add.sprite(0, 0, spriteKey).setScale(2.5);
                enemySprite.push(sprite);
                sprite.id = `${spriteKey}_${i}`; //for assigning a unique id to each enemy
                sprite.name = `${spriteKey.charAt(0).toUpperCase() + spriteKey.slice(1)} ${i + 1}`; // Name like "Skeleton 1", "Skeleton 2", etc.
                sprite.health = health;
                sprite.xp = xp;
            }
        };

        if (enemyId === 'skeleton') {
            createEnemy('skeleton', 100, 5, 3);
        } else if (enemyId === 'vampirate') {
            createEnemy('vampirate', 200, 10, 3);
        } else if (enemyId === 'iceElf') {
            createEnemy('iceBear', 300, 15, 1);
            createEnemy('iceElf', 300, 15, 2);
        } else if (enemyId === 'grandma') {
            createEnemy('grandma', 500, 20, 1);
            createEnemy('kitten', 200, 20, 2);
        } else if (enemyId === 'stan') {
            createEnemy('stan', 1000, 30, 1);
        } else if (this.textures.exists(enemyId)) {
            createEnemy(enemyId, 100); // Default health for specific enemy
        } else {
            console.error(`Enemy ID "${enemyId}" does not exist!`); // Handle invalid enemyId
        }
        const enemyPositions = [
            { x: 8, y: 10 }, // Position for the first enemy
            { x: 5, y: 13 }, // Position for the second enemy
            { x: 5, y: 7 }, // Position for the third enemy
        ];

        // Creates tilemap
        const gridEngineConfig = {
            characters: [
                {
                    id: "baileigh",
                    sprite: sprites.baileigh,
                    startPosition: { x: 23, y: 14 },
                    offsetY: -4,
                },
                {
                    id: "colton",
                    sprite: sprites.colton,
                    startPosition: { x: 23, y: 9 },
                    offsetY: -4,
                },
                {
                    id: "danny",
                    sprite: sprites.danny,
                    startPosition: { x: 19, y: 7 },
                    offsetY: -4,
                },
                {
                    id: "tyler",
                    sprite: sprites.tyler,
                    startPosition: { x: 19, y: 12 },
                    offsetY: -4,
                },
            ],
        };
        enemySprite.forEach((sprite, index) => {
            gridEngineConfig.characters.push({
                id: `enemy${index + 1}`, // Unique ID for each enemy
                sprite: sprite,
                startPosition: enemyPositions[index],
                offsetY: -4,
            });
        });

        this.gridEngine.create(tilemap, gridEngineConfig);

        const createdEnemies = enemySprite.map((sprite, index) => ({
            id: sprite.id,
            name: sprite.name,
            health: sprite.health,
            xp: sprite.xp,
            stats: { Speed: 10 }, // Example stats, adjust as needed
            abilities: [{ name: 'Attack', damage: 10 }], // Example abilities, adjust as needed
        }));
        console.log('createdEnemies:', createdEnemies);
        setEnemiesState(createdEnemies);
    }
};

export default BattleScreen;





