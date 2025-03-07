import "nes.css/css/nes.min.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BattleScene } from "../BattleScreen/BattleScreen.jsx";
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
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
    }

    create() {
        this.cameras.main.setZoom(2);
        const tilemap = this.make.tilemap({ key: "tilemap" });
        const tileset = tilemap.addTilesetImage("dragonRoom-tilesets", "dragonRoom-tilesets");
        const baseLayer = tilemap.createLayer("base", tileset, 0, 0);
        const objectsLayer = tilemap.createLayer("objects", tileset, 0, 0);
        const collidableTiles = [3, 4, 5, 11, 12, 13];
        objectsLayer.setCollision(collidableTiles);

        // layerNames.forEach(layerName => {
        //     try {
        //         console.log(`Creating layer: ${layerName}`);
        //         const tilemapLayer = tilemap.createLayer(layerName, tileset, 0, 0);
        //         if (!tilemapLayer) {
        //             throw new Error(`Layer '${layerName}' could not be created.`);
        //         }
        //     } catch (e) {
        //         console.error(`Error initializing tilemap. ${e.message}`);
        //     }
        // });

        this.colton = this.add.sprite(128, 224, 'colton').setScale(0.75).setVisible(true);
        this.physics.add.collider(this.colton, objectsLayer);
        this.dragon = this.add.sprite(96, 64, 'dragon').setScale(2).setState('ALIVE');
        // this.player = this.colton;

        this.cameras.main.setScroll(-275, -175);
        this.txt = this.add.text(80, 257, 'Press space to battle', { font: '"Press Start 2P"', color: '#000000' });

        const username = localStorage.getItem("username");
        const getDragon = async () => {
            try {
                const response = await fetch(`/api/enemy/${username}/dragon`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer: ${auth.getToken()}`
                    }
                });

                const data = await response.json();
                console.log(data)
                if (data.alive === false) {
                    this.dragon.setState('DEAD');
                }
            } catch (error) {
                console.error('Error fetching enemies:', error);
            }
        }
        getDragon();

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
    }

    update() {
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.gridEngine.setSpeed("player", 3);
        const pos = JSON.stringify(this.gridEngine.getPosition("player"));

        if (this.cursors.left.isDown) {
            this.gridEngine.move("player", "left");
        } else if (this.cursors.right.isDown) {
            this.gridEngine.move("player", "right");
        } else if (this.cursors.up.isDown) {
            this.gridEngine.move("player", "up");
        } else if (this.cursors.down.isDown) {
            this.gridEngine.move("player", "down");
        }

        if (pos === '{"x":1,"y":3}' && this.dragon.state === 'ALIVE') {
            this.txt.setColor('#ffffff')
        } else {
            this.txt.setColor('#000000');
        }

        this.cursors.space.once("down", () => {
            if (this.txt.style.color === '#ffffff') {
                window.location.assign(`/battle?enemyId=dragon`);
            }
        });
    }
};

export default DragonRoom;
