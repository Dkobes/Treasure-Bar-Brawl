import Phaser from 'phaser';
import { useEffect, useState, useRef } from 'react';
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
    const [attackImage, setAttackImage] = useState(null);
    const username = localStorage.getItem("username");

    const phaserGameRef = useRef(null); // Create a ref to hold the Phaser game instance

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
                const party = data.map(character => ({ ...character, id: character.name.toLowerCase(), health: character.stats.HP }));
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

    const attackImages = {
        "Amlug Roar": "amlugRoar",
        "Attack": "attack",
        "Bite": "bite",
        "Coin Fling": "coinFling",
        "Dragon's Fury": "dragonsFury",
        "Eat More": "eatMore",
        "Energy Break": "energyBreak",
        "Feline Frenzy": "felineFrenzy",
        "Femur Fling": "femurFling",
        "Fire Breath": "fireBreath",
        "Hook": "hook",
        "Ice Arrow": "iceArrow",
        "JavaScript Slash": "javaScriptSlash",
        "Maul": "maul",
        "MERNder": "MERNder",
        "Scratch": "scratch",
        "Typescript Tornado": "typescriptTornado",
        "Eldritch Blast": "eldritchBlast",
        "Fireball": "fireball",
        "Fire Bolt": "fireBolt",
        "Holy Blade": "holyBlade",
        "Holy Bolt": "holyBolt",
        "Meteor Shower": "meteorShower",
        "Poison": "poison",
        "Prayer": "prayer",
        "Shadow Curse": "shadowCurse",
        "Shadow Strike": "shadowStrike",
        "Shatter": "shatter",
        "Sneak Attack": "sneakAttack"
    };

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

        phaserGameRef.current = new Phaser.Game(config);

        phaserGameRef.current.scene.start('BattleScene', { enemyId, enemies, setEnemiesState });

        return () => phaserGameRef.current.destroy(true);
    }, [enemies]);

    useEffect(() => {
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
        const allCharacters = [...charactersState, ...enemiesState];
    
        allCharacters.forEach(character => {
            character.initiative = character.stats.Speed + Math.floor(Math.random() * 100) + 1; 
        });
    
        allCharacters.sort((a, b) => b.initiative - a.initiative);
    
        console.log("Turn Order:", allCharacters.map(char => ({ name: char.id, initiative: char.initiative })));
    
        setTurnOrder(allCharacters);
    }, [enemiesState, charactersState]);

    useEffect(() => {
        const currentCharacter = turnOrder[currentTurn];

    if (currentCharacter && currentCharacter.health <= 0) {
        setCurrentTurn((currentTurn + 1) % turnOrder.length);
        return; 
    }
        const currentEnemy = turnOrder[currentTurn];
        if (currentEnemy && enemiesState.some(enemy => enemy.name === currentEnemy.name)) {
            if (currentEnemy.health <= 0) {
                setCurrentTurn((currentTurn + 1) % turnOrder.length);
                return; 
            }

            const enemy = turnOrder[currentTurn];
            const randomAbility = enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
            const characters = charactersState.filter(character => character.health > 0);
            const randomTarget = randomAbility.heal ? enemy : characters[Math.floor(Math.random() * characters.length)];
            
            const attackTimeout = setTimeout(() => {
                handleAttack(enemy.id, randomAbility.name, randomTarget.id);
            }, 2000); 

            return () => clearTimeout(attackTimeout);
        
    }
    }, [currentTurn, turnOrder]);

    const handleDeath = (target) => {
        console.log('handleDeath called with target:', target); 
        const sprite = phaserGameRef.current.scene.getScene('BattleScene').children.getByName(target.id); 

        
        if (sprite) {
            // Apply death effect (e.g., rotate or scale down)
            sprite.setAngle(90); // Rotate the sprite to indicate death
            sprite.setAlpha(0.5); // Make the sprite semi-transparent
            console.log(`${target.name} is dead. Visual effect applied.`);
        } else {
            console.log(`Sprite not found for ${target.name}`);
        }
    };

    const handleAttack = (attackerId, attackName, targetId) => {
        console.log('handleAttack called with:', { attackerId, attackName, targetId });
        const attacker = turnOrder.find(character => character.id === attackerId);
        if (!attacker || attacker.health <= 0) {
            return; 
        }
    
        const target = turnOrder.find(enemy => enemy.id === targetId);
        if (!target) {
            console.error('Invalid target:', targetId);
            return;
        }
    
        const ability = attacker.abilities.find(ability => ability.name === attackName);
        if (!ability) {
            console.error('Invalid ability:', attackName);
            return;
        }
    
        if (ability.damage) {
            setBattleLog(prevLog => [
                ...prevLog,
                `${attacker.name} used ${attackName} on ${target.name} for ${ability.damage} damage`
            ]);

            target.health = Math.max(target.health - ability.damage, 0);
        } else if (ability.heal) {
            const healAmount = Math.min(ability.heal, target.stats.HP - target.health);
            
            setBattleLog(prevLog => [
                ...prevLog,
                `${attacker.name} used ${attackName} on ${target.name} and healed for ${healAmount} HP`
            ]);
    
            target.health = Math.min(target.health + healAmount, target.stats.HP);
        }
        const imageName = attackImages[attackName];
        if (imageName) {
            console.log('Image name for attack:', imageName);
            setAttackImage({ name: imageName, x: target.x, y: target.y });

            setTimeout(() => {
                setAttackImage(null);
            }, 1000);
        } else {
            console.error('No image found for attack:', attackName);
        }

        if (target.health <= 0) {
                handleDeath(target); // Call the death handler for enemies   
        }
        
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
    
        const nextTurn = (currentTurn + 1) % turnOrder.length;
        setCurrentTurn(nextTurn);
    };
   
   
    
    useEffect(() => {
    }, [charactersState, enemiesState]); 

    const handleLevelUp = (characters, enemies) => {
        const xpThresholds = [15, 45, 90, 150, 250, 750];
        let enemyXP = enemies.reduce((acc, enemy) => acc + enemy.experience, 0);
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

            {attackImage && (
                <div className="attack-animation">
                  <img src={`../src/assets/attackAnimation/${attackImage.isEnemy ? 'enemy' : 'player'}/${attackImage.name}.png`} alt={attackImage.name} style={{
                position: 'absolute',
                left: `${(window.innerWidth - 100) / 2}px`, 
                top: `${(window.innerHeight - 100) / 2.5}px`, 
                zIndex: 100, 
                transform: 'scale(2)'
            }} />
                </div>
            )}
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
        this.load.image('skeleton', '../src/assets/enemySprite/skeleton.png');
        this.load.image('vampirate', '../src/assets/enemySprite/vampirate.png');
        this.load.image('iceElf', '../src/assets/enemySprite/iceElf.png');
        this.load.image('iceBear', '../src/assets/enemySprite/iceBear.png');
        this.load.image('grandma', '../src/assets/enemySprite/grandma.png');
        this.load.image('kitty', '../src/assets/enemySprite/kitten.png');
        this.load.image('stan', '../src/assets/enemySprite/battleStan.png');
        this.load.image('dragon', '../src/assets/enemySprite/battleDragon.png');
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('danny', '../src/assets/playerSprite/danny.png');
        this.load.image('tyler', '../src/assets/playerSprite/tyler.png');
        this.load.image('tiles', '../src/assets/images/dungeon-tileset.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/Dungeon.json');
        this.load.image('amlugRoar', '../src/assets/attackAnimation/player/amlugRoar.png');
        this.load.image('attack', '../src/assets/attackAnimation/player/attack.png');
        this.load.image('bite', '../src/assets/attackAnimation/player/bite.png');
        this.load.image('coinFling', '../src/assets/attackAnimation/player/coinFling.png');
        this.load.image('dragonsFury', '../src/assets/attackAnimation/player/dragonsFury.png');
        this.load.image('eatMore', '../src/assets/attackAnimation/player/eatMore.png');
        this.load.image('energyBreak', '../src/assets/attackAnimation/player/energyBreak.png');
        this.load.image('felineFrenzy', '../src/assets/attackAnimation/player/felineFrenzy.png');
        this.load.image('femurFling', '../src/assets/attackAnimation/player/femurFling.png');
        this.load.image('fireBreath', '../src/assets/attackAnimation/player/fireBreath.png');
        this.load.image('hook', '../src/assets/attackAnimation/player/hook.png');
        this.load.image('iceArrow', '../src/assets/attackAnimation/player/iceArrow.png');
        this.load.image('javaScriptSlash', '../src/assets/attackAnimation/player/javaScriptSlash.png');
        this.load.image('maul', '../src/assets/attackAnimation/player/maul.png');
        this.load.image('MERNder', '../src/assets/attackAnimation/player/MERNder.png');
        this.load.image('scratch', '../src/assets/attackAnimation/player/scratch.png');
        this.load.image('typescriptTornado', '../src/assets/attackAnimation/player/typescriptTornado.png');
        this.load.image('eldritchBlast', '../src/assets/attackAnimation/player/eldritchBlast.png');
        this.load.image('fireball', '../src/assets/attackAnimation/player/fireball.png');
        this.load.image('fireBolt', '../src/assets/attackAnimation/player/fireBolt.png');
        this.load.image('holyBlade', '../src/assets/attackAnimation/player/holyBlade.png');
        this.load.image('holyBolt', '../src/assets/attackAnimation/player/holyBolt.png');
        this.load.image('meteorShower', '../src/assets/attackAnimation/player/meteorShower.png');
        this.load.image('poison', '../src/assets/attackAnimation/player/poison.png');
        this.load.image('prayer', '../src/assets/attackAnimation/player/prayer.png');
        this.load.image('shadowCurse', '../src/assets/attackAnimation/player/shadowCurse.png');
        this.load.image('shadowStrike', '../src/assets/attackAnimation/player/shadowStrike.png');
        this.load.image('shatter', '../src/assets/attackAnimation/player/shatter.png');
        this.load.image('sneakAttack', '../src/assets/attackAnimation/player/sneakAttack.png');
    }

    create(data) {
        const { enemyId, enemies, setEnemiesState } = data;

        this.cameras.main.setZoom(.80);
        const tilemap = this.make.tilemap({ key: "tilemap" });

        console.log('Tilemap:', tilemap);
        console.log('Tilemap layers:', tilemap.layers);

        const tileset = tilemap.addTilesetImage("32x32 Dungeon", "tiles");

        const floorLayer = tilemap.createLayer('Floor', tileset, 0, 0);
        const wallLayer = tilemap.createLayer('Walls', tileset, 0, 0);
        const wallsidesLayer = tilemap.createLayer('Side Walls and Pillars', tileset, 0, 0);

        this.attackAnimation = data.attackAnimation;

        

        const sprites = {
            baileigh: this.add.sprite(0, 0, 'baileigh').setScale(2).setName('baileigh'),
            colton: this.add.sprite(0, 0, 'colton').setScale(2).setName('colton'),
            danny: this.add.sprite(0, 0, 'danny').setScale(2).setName('danny'),
            tyler: this.add.sprite(0, 0, 'tyler').setScale(2).setName('tyler'),
        };
        

        const enemySprite = [];

        const enemyPositions = [
            { x: 8, y: 10 }, 
            { x: 5, y: 13 }, 
            { x: 5, y: 7 }, 
        ];

        const removeEnemySprite = (sprite) => {
            if (sprite) {
                sprite.destroy(); // This removes the sprite from the scene
                console.log(`Destroying enemy sprite: ${sprite.name}`);
            } else {
                console.log(`Sprite not found for destruction.`);
            }
        };

        const createEnemy = (spriteKey, count = 1) => {
            const enemyData = enemies.find(enemy => enemy.alias === spriteKey);

            for (let i = 0; i < count; i++) {
            console.log(`Creating enemy: ${spriteKey} ${i + 1}`);
            const sprite = this.add.sprite(0, 0, spriteKey).setScale(2.5);
            enemySprite.push(sprite);
            sprite.id = `${spriteKey}_${i}`; 
            sprite.name = `${spriteKey.charAt(0).toUpperCase() + spriteKey.slice(1)} ${i + 1}`; 
            sprite.health = enemyData.stats.HP;
            sprite.xp = enemyData.experience;
            sprite.x = enemyPositions[i].x;
            sprite.y = enemyPositions[i].y;
            sprite.setName(sprite.id); 

            if (sprite.health <= 0) {
                removeEnemySprite(sprite);
            }
            }
        };

        if (enemyId === 'skeleton') {
            createEnemy('skeleton', 3);
        } else if (enemyId === 'vampirate') {
            createEnemy('vampirate', 3);
        } else if (enemyId === 'iceElf') {
            createEnemy('iceBear', 1);
            createEnemy('iceElf', 2);
        } else if (enemyId === 'grandma') {
            createEnemy('grandma', 1);
            createEnemy('kitty', 2);
        } else if (enemyId === 'stan') {
            createEnemy('stan', 1);
        } else if (enemyId === 'dragon') {
            createEnemy('dragon', 1);
        } else if (this.textures.exists(enemyId)) {
            createEnemy(enemyId, 1); 
        } else {
            console.error(`Enemy ID "${enemyId}" does not exist!`); 
        }
        
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
                id: `enemy${index + 1}`, 
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
            ...enemies.find(enemy => enemy.alias === sprite.id.split("_")[0]),
        }));
        console.log('createdEnemies:', createdEnemies);
        setEnemiesState(createdEnemies);
    }
};

export default BattleScreen;





