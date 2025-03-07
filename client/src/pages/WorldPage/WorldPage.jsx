import "nes.css/css/nes.min.css";
import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';
import auth from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './WorldPage.css';
import { BattleScene } from '../BattleScreen/BattleScreen.jsx';

export const WorldScreen = () => {
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
            scene: [WorldScene, BattleScene],
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    return (
        <div>
            <div id="phaser-game"></div>
            <button className="nes-btn is-primary" onClick={() => navigate('/party-menu')}>
                Party Menu
            </button>
        </div>
    );
};

const WorldScene = class extends Phaser.Scene {
    constructor() {
        super ({ key: 'WorldScene' });
    }

    preload () {
        // add in correct items to load
        this.load.image('skeleton', '../src/assets/enemySprite/skeleton.png');
        this.load.image('vampirate', '../src/assets/enemySprite/vampirate.png');
        this.load.image('iceElf', '../src/assets/enemySprite/iceElf.png');
        this.load.image('grandma', '../src/assets/enemySprite/grandma.png');
        this.load.image('stan', '../src/assets/enemySprite/sorcererStan.png');
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('danny', '../src/assets/playerSprite/danny.png');
        this.load.image('tyler', '../src/assets/playerSprite/tyler.png');
        this.load.image('baseTiles', '../src/assets/images/bar-base-tileset.png');
        this.load.image('furnitureTiles', '../src/assets/images/bar-furniture-tileset.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/treasure-bar-map.json');
    }

    create() {
        //bar
        this.cameras.main.setZoom(2);
        const tilemap = this.make.tilemap({ key: "tilemap" });
        tilemap.addTilesetImage("base", "baseTiles");
        tilemap.addTilesetImage("furniture", "furnitureTiles");
        tilemap.createLayer(0, "base", 0, 0);
        tilemap.createLayer(1, "furniture", 0, 0);

        //player sprites
        this.baileigh = this.add.sprite(0, 0, 'baileigh').setScale(0.75);
        this.baileigh.setVisible(false);
        this.colton = this.add.sprite(0, 0, 'colton').setScale(0.75);
        this.colton.setVisible(true);
        this.dany = this.add.sprite(0, 0, 'danny').setScale(0.75);
        this.dany.setVisible(false);
        this.tyler = this.add.sprite(0, 0, 'tyler').setScale(0.75);
        this.tyler.setVisible(false);
        this.player = this.colton; //Placeholder

        //enemy sprites
        this.skeleton = this.add.sprite(0, 0, 'skeleton').setScale(0.75).setState('ALIVE');
        this.vampirate = this.add.sprite(0, 0, 'vampirate').setScale(0.75).setState('ALIVE');
        this.elf = this.add.sprite(0, 0, 'iceElf').setScale(0.75).setState('ALIVE');
        this.grandma = this.add.sprite(0, 0, 'grandma').setScale(0.75).setState('ALIVE');
        this.stan = this.add.sprite(0, 0, 'stan').setScale(0.75).setState('ALIVE');

        this.cameras.main.setScroll(-275, -175);
        this.txt = this.add.text(80, 257, 'Press space to battle', { font: '"Press Start 2P"', color: '#000000' });
        
        // Fetches enemies and sets the enemy npcs' state
        const username = localStorage.getItem("username");
        const getEnemies = async () => {
            try {
                const response = await fetch(`/api/enemy/${username}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer: ${auth.getToken()}`
                    }
                });

                const data = await response.json();
                
                if (data[0].alive === false) {
                    this.skeleton.setState('DEAD');
                }
                if (data[1].alive === false) {
                    this.vampirate.setState('DEAD');
                }
                if (data[2].alive === false) {
                    this.elf.setState('DEAD');
                }
                if (data[4].alive === false) {
                    this.grandma.setState('DEAD');
                }
                if (data[6].alive === false) {
                    this.stan.setState('DEAD');
                }
            } catch (error) {
                console.error('Error fetching enemies:', error);
            }
        }
        getEnemies();

        //creates tilemap
        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.player,
                    startPosition: { x: 1, y: 7},
                    offsetY: -4,
                },
                {
                    id: "skeleton",
                    sprite: this.skeleton,
                    startPosition: { x: 1, y: 2},
                    offsetY: -4,
                },
                {
                    id: "vampirate",
                    sprite: this.vampirate,
                    startPosition: { x: 3, y: 2},
                    offsetY: -4,
                },
                {
                    id: "iceElf",
                    sprite: this.elf,
                    startPosition: { x: 6, y: 4},
                    offsetY: -4,
                },
                {
                    id: "grandma",
                    sprite: this.grandma,
                    startPosition: { x: 6, y: 6},
                    offsetY: -4,
                },
                {
                    id: "stan",
                    sprite: this.stan,
                    startPosition: { x: 3, y: 0},
                    offsetY: -4,
                },
            ],
        };

        this.gridEngine.create(tilemap, gridEngineConfig);
    }

    update() {
        //arrow key input for movement
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.gridEngine.setSpeed("player", 3);
        const pos = JSON.stringify(this.gridEngine.getPosition("player"));
        const allEnemiesDead = this.getEnemyState();

        if (this.cursors.left.isDown) {
            this.gridEngine.move("player", "left");
        } else if (this.cursors.right.isDown) {
            this.gridEngine.move("player", "right");
        } else if (this.cursors.up.isDown) {
            this.gridEngine.move("player", "up");
        } else if (this.cursors.down.isDown) {
            this.gridEngine.move("player", "down");
        }

        if (pos === '{"x":1,"y":3}' && this.skeleton.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":3,"y":3}' && this.vampirate.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":4,"y":2}' && this.vampirate.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":6,"y":3}' && this.elf.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":7,"y":4}' && this.elf.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":7,"y":6}' && this.grandma.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":6,"y":7}' && this.grandma.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":5,"y":6}' && this.grandma.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":4,"y":0}' && this.stan.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else if (pos === '{"x":7,"y":0}' && allEnemiesDead) {
            this.txt.setText('Press space to enter?');
            this.txt.setColor('#ffffff');
        } else {
            this.txt.setColor('#000000');
        }

            this.cursors.space.once("down", () => {
                const selectedEnemyId = this.getSelectedEnemy();
                if (this.txt.style.color === '#ffffff' && selectedEnemyId) {
                    window.location.assign(`/battle?enemyId=${selectedEnemyId}`);
                } else if (this.txt.style.color === '#ffffff' && allEnemiesDead) {
                    window.location.assign('/dragonRoom');
                }
            });
        }
    
        getSelectedEnemy() {
            // Implement logic to determine which enemy is near the player
            const playerPosition = this.gridEngine.getPosition("player");
            
            // Check each enemy's position
            for (const enemy of ["skeleton", "vampirate", "iceElf", "grandma", "stan"]) {
                const enemyPosition = this.gridEngine.getPosition(enemy);
                if (this.isNear(playerPosition, enemyPosition)) {
                    return enemy; // Return the ID of the selected enemy
                }
            }
            return null; // No enemy selected
        }
        
        isNear(playerPosition, enemyPosition) {
            // Define what "near" means, e.g., within one tile distance
            return Math.abs(playerPosition.x - enemyPosition.x) <= 1 && Math.abs(playerPosition.y - enemyPosition.y) <= 1;
        }

        getEnemyState() {
            const enemies = [this.skeleton, this.vampirate, this.elf, this.grandma, this.stan];
            if (!enemies.find((enemy) => enemy.state === 'ALIVE')) {
                return true;
            }
            return false;
        }
    }


export default WorldScreen;