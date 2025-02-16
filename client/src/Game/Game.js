import Phaser from 'phaser';
import BattleScene from './battleScreen';

class Game extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-container',
            scene: [BattleScene],
        };

        super(config);

        // Global game state for characters, XP, and ability levels
        this.globalState = {
            party: [
                { name: "Tyler", level: 1, xp: 0, hp: 200, mp: 50, stats: { Speed: 12, Attack: 16, Defense: 20, Resist: 18, Magic: 14 }, 
                  abilities: [
                    { name: "Prayer", heal: 50, cooldown: 0.5, level: 1 },
                     { name: "Shield", damage: 100, cooldown: 1, level: 3 },
                     { name: "Holy Blade", damage: 200, cooldown: 2, level: 5 }] 
                },
                { name: "Colton", level: 1, xp: 0, hp: 120, mp: 120, stats: { Speed: 16, Attack: 18, Defense: 12, Resist: 14, Magic: 20 },
                  abilities: [
                    { name: "Fire Bolt", damage: 50, cooldown: 0.5, level: 1 },
                     { name: "Fireball", damage: 100, cooldown: 1, level: 3 },
                     { name: "Meteor Swarm", damage: 200, cooldown: 2, level: 5 }] 
                },
                { name: "Baileigh", level: 1, xp: 0, hp: 100, mp: 140, stats: { Speed: 18, Attack: 14, Defense: 12, Resist: 16, Magic: 20 },
                  abilities: [{ name: "Eldritch Blast", damage: 50, cooldown: 0.5, level: 1 }, { name: "Shatter", damage: 100, cooldown: 1, level: 3 }] 
                },
                { name: "Danny", level: 1, xp: 0, hp: 140, mp: 100, stats: { Speed: 20, Attack: 18, Defense: 16, Resist: 14, Magic: 12 },
                  abilities: [{ name: "Sneak Attack", damage: 50, cooldown: 0.5, level: 1 }, { name: "Viper's Kiss", damage: 100, cooldown: 1, level: 3 }] 
                },
            ],
            enemies: [], // Enemies will be set dynamically
        };
    }

    updateGameState(newData) {
        this.globalState = { ...this.globalState, ...newData };
    }

    getGameState() {
        return this.globalState;
    }
}

export default Game;

  