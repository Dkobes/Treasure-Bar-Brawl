import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BattleScreen.css';
import { GridEngine } from 'grid-engine';

const tilemapData = {
    "height": 10,
    "width": 10,
    "tilewidth": 32,
    "tileheight": 32,
    "layers": [
      {
        "data": [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ],
        "height": 10,
        "name": "Tile Layer 1",
        "opacity": 1,
        "type": "tilelayer",
        "visible": true,
        "width": 10,
        "x": 0,
        "y": 0
      }
    ],
    "tilesets": [
      {
        "firstgid": 1,
        "image": "assets/images/dungeon-tileset.png",
        "imageheight": 32,
        "imagewidth": 32,
        "margin": 0,
        "name": "dungeon-tileset",
        "spacing": 0,
        "tilecount": 1,
        "tileheight": 32,
        "tilewidth": 32
      }
    ]
  };

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
    }

    create() {
        //bar
        const map = this.make.tilemap({ data: tilemapData, tileWidth: 32, tileHeight: 32 });
        const tileset = map.addTilesetImage('dungeon-tileset', 'tiles');
        map.createLayer('Tile Layer 1', tileset, 0, 0);
       

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

export default BattleScreen;
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
