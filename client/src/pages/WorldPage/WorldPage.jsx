import "nes.css/css/nes.min.css";
import Phaser from 'phaser';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const WorldScene = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
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
        this.load.image();
        this.load.image();
    }

    create() {
        //bar
        this.add.image(400, 300, '') //add in correct image name for bar;

        //player sprite
        this.player = this.add.sprite(400, 300, 'player').setScale(0.5); //add in correct name for player

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

export default WorldScene;