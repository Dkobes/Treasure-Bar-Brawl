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
        tilemap.createLayer(0, "bar-base-tileset", 275, 175);
        tilemap.createLayer(1, "bar-furniture-tileset", 275, 175);

        //player sprite
        this.player = this.add.sprite(0, 0, 'colton').setScale(0.75); //add in correct name for player

        //creates tilemap
        const gridEngineConfig = {
            characters: [
                {
                    id: "colton",
                    sprite: this.player,
                    startPosition: { x: 9.5, y: 12.5 },
                    offsetY: -4,
                },
            ],
        };

        this.gridEngine.create(tilemap, gridEngineConfig);

        //arrow key input for movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.x -= 3;
        } else if (this.cursors.right.isDown) {
            this.player.x += 3;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= 3;
        } else if (this.cursors.down.isDown) {
            this.player.y += 3;
        }
    }
};

export default WorldScreen;