import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BattleScreen.css';
import { GridEngine } from 'grid-engine';



export const BattleScreen = () => {
    const navigate = useNavigate();

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
            width: 800,
            height: 600,
            pixelArt: true,
            parent: 'phaser-game',
            scene: [BattleScene],
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    return (
        <div>
            <div id="phaser-game"></div>

        </div>
    );
};

const BattleScene = class extends Phaser.Scene {
    constructor() {
        super ({ key: 'BattleScene' });
    }

    preload () {
        // add in correct items to load
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('tiles', '../src/assets/images/dungeon-tileset.png');
        this.load.json('dungeon', '../src/assets/maps/Dungeon.json');
    }

    create() {
        const dungeonData = this.cache.json.get('dungeon');
        if (!dungeonData) {
            console.error('Failed to load dungeon data');
            return;
        }
    
        console.log('Dungeon Data:', dungeonData);

        const tilemapData = this.convertDungeonDataToTilemap(dungeonData);

        console.log('Tilemap Data:', tilemapData);

        const map = this.make.tilemap({ data: tilemapData, tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('dungeon-tileset', 'tiles');
        const layer = map.createLayer(0, tileset, 0, 0);

        if (!layer) {
            console.error('Failed to create layer "Floor"');
            return;
        }

        console.log('Layer:', layer);
       

        //player sprite
        this.player = this.add.sprite(0, 0, 'baileigh').setScale(0.75); //add in correct name for player

        //creates tilemap
        const gridEngineConfig = {
            characters: [
                {
                    id: "baileigh",
                    sprite: this.player,
                    startPosition: { x: 9.5, y: 12.5 },
                    offsetY: -4,
                },
            ],
        };

        this.gridEngine.create(map, gridEngineConfig);

        //arrow key input for movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    convertDungeonDataToTilemap(dungeonData) {
        const { layers, mapWidth, mapHeight } = dungeonData;
    
        // Assuming you want to work with the "Floor" layer, which is the last layer in your case
        const floorLayer = layers.find(layer => layer.name === 'Floor');
        const wallLayer = layers.find(layer => layer.name === 'Walls');
        const wallsidesLayer = layers.find(layer => layer.name === 'Walls sides');
        const wallpillarsLayer = layers.find(layer => layer.name === 'Walls pillars');
        const miscLayer = layers.find(layer => layer.name === 'Miscs');
        const doorLayer = layers.find(layer => layer.name === 'Doors');
        
        if (!floorLayer || !floorLayer.tiles) {
            console.error('Floor layer not found or has no tiles');
            return [];
        }
    
        // Create a 2D array for the tilemap
        const tilemapData = [];
    
        // Initialize the tilemap data with zeros (or any default tile ID)
        for (let y = 0; y < mapHeight; y++) {
            const row = new Array(mapWidth).fill(0); // Fill with 0 or any default tile ID
            tilemapData.push(row);
        }
    
        // Populate the tilemap data with the actual tile IDs from the floor layer
        floorLayer.tiles.forEach(tile => {
            const { x, y, id } = tile; // Assuming each tile has x, y, and id properties
            tilemapData[y][x] = id; // Set the tile ID at the correct position
        });
        wallLayer.tiles.forEach(tile => {  
            const { x, y, id } = tile; 
            tilemapData[y][x] = id; 
        }
        );
        wallsidesLayer.tiles.forEach(tile => {
            const { x, y, id } = tile; 
            tilemapData[y][x] = id; 
        }
        );
        wallpillarsLayer.tiles.forEach(tile => {
            const { x, y, id } = tile; 
            tilemapData[y][x] = id; 
        }
        );
        miscLayer.tiles.forEach(tile => {
            const { x, y, id } = tile; 
            tilemapData[y][x] = id; 
        }
        );
        doorLayer.tiles.forEach(tile => {
            const { x, y, id } = tile; 
            tilemapData[y][x] = id; 
        }
        );
    
        return tilemapData;
    }
};

    export default BattleScreen;

//     convertDungeonDataToTilemap(dungeonData) {
//         console.log('Converting dungeon data to tilemap...');
//         const layer = dungeonData.layers.find(layer => layer.name === 'Floor');
//         if (!layer) {
//             console.error('Failed to find Floor layer in dungeon data');
//             return [];
//         }
//         const width = dungeonData.mapWidth;
//         const height = dungeonData.mapHeight;
//         const data = new Array(height).fill(0).map(() => new Array(width).fill(0));

//         layer.tiles.forEach(tile => {
//             console.log('Tile:', tile);
//             if (tile.id) {
//                 data[tile.y][tile.x] = parseInt(tile.id, 10) + 1; // Phaser uses 1-based indexing for tiles
//             } else {
//                 console.warn(`Tile at (${tile.x}, ${tile.y}) does not have a valid ID`);
//             }
//         });

//         console.log('Converted tilemap data:', data);
//         return data;
//     }
// };


// const BattleScene = class extends Phaser.Scene {
//     constructor() {
//         super({ key: 'BattleScene' });
//     }

//     init(data) {
//         this.party = data.party || [];
//         this.enemies = data.enemies || [];
//         this.turnOrder = [...this.party, ...this.enemies].sort((a, b) => b.stats.Speed - a.stats.Speed);
//         this.currentTurnIndex = 0;
//         this.selectedTarget = null;
//     }

//     preload() {
//         this.load.image('battleBackground', '/assets/battle-bg.png');
//         this.load.image('playerSprite', '/assets/playerSprite/baileigh.png');
//         this.load.image('playerSprite', '/assets/playerSprite/colton.png');
//         this.load.image('playerSprite', '/assets/playerSprite/dany.png');
//         this.load.image('playerSprite', '/assets/playerSprite/tyler.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy1.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy2.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy3.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy4.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy5.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy6.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy7.png');
//         this.load.image('enemySprite', '/assets/enemySprite/enemy8.png');
//     }

//     create() {
//         this.add.image(400, 300, 'battleBackground');

//         // Render Player Characters
//         this.party.forEach((character, index) => {
//             let sprite = this.add.image(150, 200 + index * 100, 'playerSprite').setScale(0.8);
//             sprite.setData('character', character);
//             this.add.text(200, 190 + index * 100, `${character.name} (HP: ${character.stats.HP})`, { color: 'white' });
//         });

//         // Render Enemies with Clickable Selection
//         this.enemySprites = [];
//         this.enemies.forEach((enemy, index) => {
//             let sprite = this.add.image(650, 200 + index * 100, 'enemySprite').setScale(0.8);
//             sprite.setData('enemy', enemy);
//             sprite.setInteractive();
//             sprite.on('pointerdown', () => this.selectTarget(sprite));
//             this.enemySprites.push(sprite);
//             this.add.text(600, 190 + index * 100, `${enemy.name} (HP: ${enemy.hp})`, { color: 'red' });
//         });

//         this.createTurnText();
//         this.startTurn();
//     }

//     createTurnText() {
//         this.turnText = this.add.text(350, 450, "", { color: 'yellow', fontSize: '20px' });
//     }

//     startTurn() {
//         const currentUnit = this.turnOrder[this.currentTurnIndex];
//         if (!currentUnit) return;

//         this.turnText.setText(`${currentUnit.name}'s Turn`);

//         if (this.party.includes(currentUnit)) {
//             this.showAbilityOptions(currentUnit);
//         } else {
//             this.enemyTurn(currentUnit);
//         }
//     }

//     showAbilityOptions(character) {
//         this.clearButtons();
//         character.abilities.forEach((ability, index) => {
//             this.add.text(300, 500 + index * 30, ability.name, { color: 'yellow' })
//                 .setInteractive()
//                 .on('pointerdown', () => this.performAttack(character, ability));
//         });
//     }

//     selectTarget(sprite) {
//         this.selectedTarget = sprite.getData('enemy');
//         this.enemySprites.forEach(s => s.setTint(0xffffff)); // Reset colors
//         sprite.setTint(0xff0000); // Highlight selected enemy
//     }

//     performAttack(attacker, ability) {
//         if (!this.selectedTarget) return;

//         this.selectedTarget.hp -= ability.damage;
//         this.updateUI();

//         if (this.selectedTarget.hp <= 0) {
//             this.enemies = this.enemies.filter(e => e.hp > 0);
//             this.enemySprites = this.enemySprites.filter(s => s.getData('enemy').hp > 0);
//         }

//         this.selectedTarget = null; // Reset target after attack
//         this.nextTurn();
//     }

//     enemyTurn(enemy) {
//         setTimeout(() => {
//             const availableAbilities = enemy.abilities.filter(a => a.damage > 0);
//             const chosenAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];

//             const target = this.party[Math.floor(Math.random() * this.party.length)];
//             target.stats.HP -= chosenAbility.damage;

//             this.updateUI();

//             if (target.stats.HP <= 0) {
//                 this.party = this.party.filter(p => p.stats.HP > 0);
//             }

//             this.nextTurn();
//         }, 1000);
//     }

//     updateUI() {
//         this.clearButtons();
//         if (this.party.length === 0) {
//             this.turnText.setText("Game Over");
//         } else if (this.enemies.length === 0) {
//             this.turnText.setText("Victory!");
//         }
//     }

//     nextTurn() {
//         this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
//         this.startTurn();
//     }

//     clearButtons() {
//         this.children.list.forEach(child => {
//             if (child.type === "Text" && child.style.color === "yellow") {
//                 child.destroy();
//             }
//         });
//     }
// };

// export const BattleScreen = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [party, setParty] = useState([]);
//     const [enemies, setEnemies] = useState(location.state?.enemies || []);

//     useEffect(() => {
//         const fetchParty = async () => {
//             try {
//                 const response = await fetch('/api/characters');
//                 const data = await response.json();
//                 setParty(data);
//             } catch (error) {
//                 console.error("Error fetching party:", error);
//             }
//         };
//         fetchParty();
//     }, []);

//     useEffect(() => {
//         const config = {
//             type: Phaser.AUTO,
//             width: 800,
//             height: 600,
//             parent: 'phaser-game',
//             scene: [BattleScene],
//         };

//         const game = new Phaser.Game(config);
//         game.scene.start('BattleScene', { party, enemies });

//         return () => game.destroy(true);
//     }, [party, enemies]);

//     return (
//         <div>
//             <div id="phaser-game"></div>
//             <button onClick={() => navigate('/world')}>Exit Battle</button>
//         </div>
//     );
// };

// export default BattleScreen;
