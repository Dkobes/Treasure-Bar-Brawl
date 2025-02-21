import "nes.css/css/nes.min.css";
import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './WorldPage.css';

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
            scene: [WorldScene],
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    return (
        <div>
            <div id="phaser-game"></div>
            <button onClick={() => navigate('/battle')}>Enter Battle</button>
        </div>
    );
};

const WorldScene = class extends Phaser.Scene {
    constructor() {
        super ({ key: 'WorldScene' });
    }

    preload () {
        // add in correct items to load
        this.load.image('colton', '../src/assets/playerSprite/colton.png');
        this.load.image('baseTiles', '../src/assets/images/bar-base-tileset.png');
        this.load.image('furnitureTiles', '../src/assets/images/bar-furniture-tileset.png');
        this.load.tilemapTiledJSON('tilemap', '../src/assets/maps/treasure-bar-map.json');
    }

    create() {
        //bar
        this.cameras.main.setZoom(2);
        const tilemap = this.make.tilemap({ key: "tilemap" });
        tilemap.addTilesetImage("bar-base-tileset", "baseTiles");
        tilemap.addTilesetImage("bar-furniture-tileset", "furnitureTiles");
        tilemap.createLayer(0, "bar-base-tileset", 0, 0);
        tilemap.createLayer(1, "bar-furniture-tileset", 0, 0);

        //player sprite
        this.player = this.add.sprite(0, 0, 'colton').setScale(0.75); //add in correct name for player
        this.cameras.main.setScroll(-275, -175)

        //creates tilemap
        const gridEngineConfig = {
            characters: [
                {
                    id: "colton",
                    sprite: this.player,
                    startPosition: { x: 1, y: 7},
                    offsetY: -4,
                },
            ],
        };

        this.gridEngine.create(tilemap, gridEngineConfig);
    }

    update() {
        //arrow key input for movement
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.gridEngine.setSpeed("colton", 3);
        
        if (this.cursors.left.isDown) {
            this.gridEngine.move("colton", "left");
        } else if (this.cursors.right.isDown) {
            this.gridEngine.move("colton", "right");
        } else if (this.cursors.up.isDown) {
            this.gridEngine.move("colton", "up");
        } else if (this.cursors.down.isDown) {
            this.gridEngine.move("colton", "down");
        }
    }
};

export default WorldScreen;