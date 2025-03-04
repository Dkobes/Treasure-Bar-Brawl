import "nes.css/css/nes.min.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BattleScene } from "../BattleScreen/BattleScreen";
import { GridEngine } from 'grid-engine';
import './DragonRoom.css';
import Phaser from 'phaser';


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
            super ({ key: 'DragonScene' });
        }

        preload() {
            this.load.image('dragon-room-tilesets', 'path/to/dragon-room-tilesets.png');
        }
        
        create() {
            const tilemap = this.make.tilemap({ key: "tilemap" });
        
            const tileset = tilemap.addTilesetImage("dragon-room-tilesets", "dragon-room-tilesets");
        
            const layerNames = [
                "concrete-back-wall", "concrete-floor", "concrete-top-left-corner",
                "concrete-top-right-corner", "concrete-border-back-wall", "concrete-left-border-wall",
                "concrete-right-border-wall", "concrete-left-border-floor", "concrete-right-border-floor",
                "concrete-left-corner-floor", "concrete-right-corner-floor", "doorway",
                "barrel", "vase", "bottle", "coin-bag", "chest"
            ];
        
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
            this.colton = this.add.sprite(0, 0, 'colton').setScale(0.75).setVisible(false);
            this.danny = this.add.sprite(0, 0, 'danny').setScale(0.75).setVisible(false);
            this.tyler = this.add.sprite(0, 0, 'tyler').setScale(0.75).setVisible(false);
            this.dragon = this.add.sprite(0, 0, 'dragon').setScale(0.75).setVisible(true); 
            this.player = this.colton;
        
        // create () {
        //     const tilemap = this.make.tilemap({ key: "tilemap" });
        //     tilemap.addTilesetImage("concrete-back-wall", "concrete-back-wall");
        //     tilemap.addTilesetImage("concrete-floor", "concrete-floor");
        //     tilemap.addTilesetImage("concrete-top-left-corner", "concrete-top-left-corner");
        //     tilemap.addTilesetImage("concrete-top-right-corner", "concrete-top-right-corner");
        //     tilemap.addTilesetImage("concrete-border-back-wall", "concrete-border-back-wall");
        //     tilemap.addTilesetImage("concrete-left-border-wall", "concrete-left-border-wall");
        //     tilemap.addTilesetImage("concrete-right-border-wall", "concrete-right-border-wall");
        //     tilemap.addTilesetImage("concrete-left-border-floor", "concrete-left-border-floor");
        //     tilemap.addTilesetImage("concrete-right-border-floor", "concrete-right-border-floor");
        //     tilemap.addTilesetImage("concrete-left-corner-floor", "concrete-left-corner-floor");
        //     tilemap.addTilesetImage("concrete-right-corner-floor", "concrete-right-corner-floor");
        //     tilemap.addTilesetImage("doorway", "doorway");
        //     tilemap.addTilesetImage("barrel", "barrel");
        //     tilemap.addTilesetImage("vase", "vase");
        //     tilemap.addTilesetImage("bottle", "bottle");
        //     tilemap.addTilesetImage("coin-bag", "coin-bag");
        //     tilemap.addTilesetImage("chest", "chest");
        //     tilemap.createLayer(1, tilemap.getTileset("concrete-floor"), 0, 0);

        //     this.baileigh = this.add.sprite(0, 0, 'baileigh').setScale(0.75).setVisible(false);
        //     this.colton = this.add.sprite(0, 0, 'colton').setScale(0.75).setVisible(false);
        //     this.danny = this.add.sprite(0, 0, 'danny').setScale(0.75).setVisible(false);
        //     this.tyler = this.add.sprite(0, 0, 'tyler').setScale(0.75).setVisible(false);
        //     this.dragon = this.add.sprite(0, 0, 'dragon').setScale(0.75).setVisible(true);
        //     this.player = this.colton;

            const gridEngineConfig = {
                characters: [
                    {
                        id: "player",
                        sprite: this.player,
                        startPosition: {x: 1, y: 7},
                        offsetY: -4,
                    },
                    {
                        id: "dragon",
                        sprite: this.dragon,
                        startPosition: {x: 3, y: 2},
                        offsetY: -4,
                    },
                ],
            };

            this.gridEngine.create(tilemap, gridEngineConfig);

            this.cameras.main.setScroll(-275, -175);
            this.cameras.main.setZoom(2);
            this.txt = this.add.text(80, 257, 'Press space to battle', { font: '"Press Start 2P"', color: '#000000' });
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

            if (pos === '{"x":3, "y":2}' && this.dragon.state === 'ALIVE') {
                this.txt.setColor('#ffffff');
            } else {
                this.txt.setColor('#000000');
            }

            if (this.cursors.space.isDown && this.txt.style.color === '#ffffff') {
                window.location.assign(`/battle?enemyId=dragon`);
            }
        }
    };

export default DragonRoom;
