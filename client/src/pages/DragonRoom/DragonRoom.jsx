import "nes.css/css/nes.min.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BattleScene } from "../BattleScreen/BattleScreen";
import { GridEngine } from 'grid-engine';
import './DragonRoom.css';
import Phaser from 'phaser';
import auth from '../../utils/auth.js';


export const DragonRoom = () => {   
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
            scene: [DragonScene, BattleScene],
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

const DragonScene = class extends Phaser.Scene {
    constructor() {
        super({ key: 'DragonScene' });
    }

    preload() {
        this.load.image('dragonRoom-tilesets', '../src/assets/images/dragonRoom-tilesets.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/dragonRoom.json');
        this.load.image('dragon', '../src/assets/enemySprite/dragon.png');
        this.load.image('baileigh', '../src/assets/playerSprite/baileigh.png');
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('danny', '../src/assets/playerSprite/danny.png');
        this.load.image('tyler', '../src/assets/playerSprite/tyler.png');
    }

    create() {
        this.cameras.main.setZoom(2);
        const tilemap = this.make.tilemap({ key: "tilemap" });
        const tileset = tilemap.addTilesetImage("dragonRoom-tilesets", "dragonRoom-tilesets");
        const layerNames = ["base", "objects"];

        layerNames.forEach(layerName => {
            try {
                console.log(`Creating layer: ${layerName}`);
                const tilemapLayer = tilemap.createLayer(layerName, tileset, 0, 0);
                if (!tilemapLayer) {
                    throw new Error(`Layer '${layerName}' could not be created.`);
                }
            } catch (e) {
                console.error(`Error initializing tilemap. ${e.message}`);
            }
        });

        this.baileigh = this.add.sprite(0, 0, 'baileigh').setScale(0.75).setVisible(false);
        this.colton = this.add.sprite(0, 0, 'colton').setScale(0.75).setVisible(true);
        this.danny = this.add.sprite(0, 0, 'danny').setScale(0.75).setVisible(false);
        this.tyler = this.add.sprite(0, 0, 'tyler').setScale(0.75).setVisible(false);
        this.dragon = this.add.sprite(0, 0, 'dragon').setScale(2).setVisible(true);
        this.player = this.colton;

        this.cameras.main.setScroll(-275, -175);
        this.txt = this.add.text(80, 257, 'Press space to battle', { font: '"Press Start 2P"', color: '#000000' });

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
                    this.dragon.setState('DEAD');
                }
            } catch (error) {
                console.error('Error fetching enemies:', error);
            }
        }
        getEnemies();

        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.player,
                    startPosition: { x: 4, y: 7 },
                    offsetY: -4,
                },
                {
                    id: "dragon",
                    sprite: this.dragon,
                    startPosition: { x: 3, y: 2 },
                    offsetY: -4,
                },
            ],
        };

        this.gridEngine.create(tilemap, gridEngineConfig);

        this.input.keyboard.on("keydown-SPACE", () => {
            const selectedEnemyId = this.getSelectedEnemy();
            if (this.txt.style.color === '#ffffff' && selectedEnemyId) {
                window.location.assign(`/battle?enemyId=${selectedEnemyId}`);
            }
        });
    }

    update() {
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.gridEngine.setSpeed("player", 3);
        const playerPosition = this.gridEngine.getPosition("player");
        const dragonPosition = this.gridEngine.getPosition("dragon");

        if (this.isNear(playerPosition, dragonPosition) && this.dragon.state === 'ALIVE') {
            this.txt.setColor('#ffffff');
        } else {
            this.txt.setColor('#000000');
        }

        if (this.cursors.left.isDown) {
            this.gridEngine.move("player", "left");
        } else if (this.cursors.right.isDown) {
            this.gridEngine.move("player", "right");
        } else if (this.cursors.up.isDown) {
            this.gridEngine.move("player", "up");
        } else if (this.cursors.down.isDown) {
            this.gridEngine.move("player", "down");
        }
    }

    getSelectedEnemy() {
        const playerPosition = this.gridEngine.getPosition("player");
        const dragonPosition = this.gridEngine.getPosition("dragon");
        if (this.isNear(playerPosition, dragonPosition)) {
            return "dragon";
        }
        return null;
    }

    isNear(playerPosition, enemyPosition) {
        return Math.abs(playerPosition.x - enemyPosition.x) <= 1 && Math.abs(playerPosition.y - enemyPosition.y) <= 1;
    }

    getEnemyState() {
        const enemies = [this.dragon];
        if (!enemies.find((enemy) => enemy.state === 'ALIVE')) {
            return true;
        }
        return false;
    }
};

export default DragonRoom;
