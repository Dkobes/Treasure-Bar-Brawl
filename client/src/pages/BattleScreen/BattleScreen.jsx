import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BattleScreen.css';
import { GridEngine } from 'grid-engine';



export const BattleScreen = () => {
    const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const enemyId = queryParams.get('enemyId');


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

        game.scene.start('BattleScene', { enemyId });

        return () => game.destroy(true);
    }, [enemyId]);

    return (
        <div>
            <div id="phaser-game"></div>

        </div>
    );
};

export const BattleScene = class extends Phaser.Scene {
    constructor() {
        super ({ key: 'BattleScene' });
    }

    preload () {
        // add in correct items to load
        this.load.image('skeleton', '../src/assets/enemySprite/skeleton.png');
        this.load.image('vampirate', '../src/assets/enemySprite/vampirate.png');
        this.load.image('iceElf', '../src/assets/enemySprite/iceElf.png');
        this.load.image('iceBear', '../src/assets/enemySprite/iceBear.png');
        this.load.image('grandma', '../src/assets/enemySprite/grandma.png');
        this.load.image('kitten', '../src/assets/enemySprite/kitten.png');
        this.load.image('stan', '../src/assets/enemySprite/sorcererStan.png');
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('danny', '../src/assets/playerSprite/danny.png');
        this.load.image('tyler', '../src/assets/playerSprite/tyler.png');
        this.load.image('tiles', '../src/assets/images/dungeon-tileset.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/dungeon.json');
    }

    create(data) {

        class HealthBar {

            constructor (scene, x, y, maxValue)
            {
                this.bar = new Phaser.GameObjects.Graphics(scene);
        
                this.x = x;
                this.y = y;
                this.value = maxValue;
                this.maxValue = maxValue;
                this.p = 76 / maxValue;
        
                this.draw();
        
                scene.add.existing(this.bar);
                this.bar.setDepth(1); // Set depth to ensure it is on top of the character
            }
        
            decrease (amount)
            {
                this.value -= amount;
        
                if (this.value < 0)
                {
                    this.value = 0;
                }
        
                this.draw();
        
                return (this.value === 0);
            }
        
            draw ()
            {
                this.bar.clear();
        
                //  BG
                this.bar.fillStyle(0x000000);
                this.bar.fillRect(this.x, this.y, 80, 16);
        
                //  Health
        
                this.bar.fillStyle(0xffffff);
                this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);
        
                if (this.value < this.maxValue * 0.3)
                {
                    this.bar.fillStyle(0xff0000);
                }
                else
                {
                    this.bar.fillStyle(0x00ff00);
                }
        
                var d = Math.floor(this.p * this.value);
        
                this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
            }
        
        }
        this.cameras.main.setZoom(.70);
        const tilemap = this.make.tilemap({ key: "tilemap" });

        console.log('Tilemap:', tilemap); // Check if the tilemap is loaded correctly
    console.log('Tilemap layers:', tilemap.layers); 

    const tileset = tilemap.addTilesetImage("32x32 Dungeon", "tiles");

          // Create layers using layer names
          const floorLayer = tilemap.createLayer('Floor', tileset, 0, 0);
          const wallLayer = tilemap.createLayer('Walls', tileset, 0, 0);
          const wallsidesLayer = tilemap.createLayer('Side Walls and Pillars', tileset, 0, 0);
          
 
        // Player sprite
        const baileighSprite = this.add.sprite(0, 0, 'baileigh').setScale(1.5);
        const coltonSprite = this.add.sprite(0, 0, 'colton').setScale(1.5);
        const danySprite = this.add.sprite(0, 0, 'danny').setScale(1.5);
        const tylerSprite = this.add.sprite(0, 0, 'tyler').setScale(1.5);

        const enemyId = data.enemyId; // Get the enemy ID passed from WorldScene
        let enemySprite = [];
        let enemyHealthBars = [];

        const createEnemy = (spriteKey, health, count = 1) => {
            for (let i = 0; i < count; i++) {
                const sprite = this.add.sprite(0, 0, spriteKey).setScale(1.5);
                enemySprite.push(sprite);
                const healthBar = new HealthBar(this, sprite.x, sprite.y - 20, health);
                enemyHealthBars.push(healthBar);
    
                // Update health bar position in the game loop
                this.events.on('update', () => {
                    healthBar.bar.setPosition(sprite.x - 40, sprite.y - 20);
                });
            }
        };
    
        if (enemyId === 'skeleton') {
            createEnemy('skeleton', 100, 3);
        } else if (enemyId === 'vampirate') {
            createEnemy('vampirate', 200, 3);
        } else if (enemyId === 'iceElf') {
            createEnemy('iceBear', 300, 1);
            createEnemy('iceElf', 300, 2);
        } else if (enemyId === 'grandma') {
            createEnemy('grandma', 500, 1);
            createEnemy('kitten', 200, 2);
        } else if (enemyId === 'stan') {
            createEnemy('stan', 1000, 1);
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
                    sprite: baileighSprite,
                    startPosition: { x: 20, y: 7 },
                    offsetY: -4,
                },
                {
                    id: "colton",
                    sprite: coltonSprite,
                    startPosition: { x: 20, y: 9 },
                    offsetY: -4,
                },
                {
                    id: "danny",
                    sprite: danySprite,
                    startPosition: { x: 20, y: 11 },
                    offsetY: -4,
                },
                {
                    id: "tyler",
                    sprite: tylerSprite,
                    startPosition: { x: 20, y: 13 },
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
    }
};
    
    export default BattleScreen;





