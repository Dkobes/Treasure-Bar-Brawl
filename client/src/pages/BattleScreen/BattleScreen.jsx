import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BattleScene = class extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    init(data) {
        this.party = data.party || [];
        this.enemies = data.enemies || [];
        this.turnOrder = [...this.party, ...this.enemies].sort((a, b) => b.stats.Speed - a.stats.Speed);
        this.currentTurnIndex = 0;
        this.selectedTarget = null;
    }

    preload() {
        this.load.image('battleBackground', '/assets/battle-bg.png');
        this.load.image('playerSprite', '/assets/player.png');
        this.load.image('enemySprite', '/assets/enemy.png');
    }

    create() {
        this.add.image(400, 300, 'battleBackground');

        // Render Player Characters
        this.party.forEach((character, index) => {
            let sprite = this.add.image(150, 200 + index * 100, 'playerSprite').setScale(0.8);
            sprite.setData('character', character);
            this.add.text(200, 190 + index * 100, `${character.name} (HP: ${character.stats.HP})`, { color: 'white' });
        });

        // Render Enemies with Clickable Selection
        this.enemySprites = [];
        this.enemies.forEach((enemy, index) => {
            let sprite = this.add.image(650, 200 + index * 100, 'enemySprite').setScale(0.8);
            sprite.setData('enemy', enemy);
            sprite.setInteractive();
            sprite.on('pointerdown', () => this.selectTarget(sprite));
            this.enemySprites.push(sprite);
            this.add.text(600, 190 + index * 100, `${enemy.name} (HP: ${enemy.hp})`, { color: 'red' });
        });

        this.createTurnText();
        this.startTurn();
    }

    createTurnText() {
        this.turnText = this.add.text(350, 450, "", { color: 'yellow', fontSize: '20px' });
    }

    startTurn() {
        const currentUnit = this.turnOrder[this.currentTurnIndex];
        if (!currentUnit) return;

        this.turnText.setText(`${currentUnit.name}'s Turn`);

        if (this.party.includes(currentUnit)) {
            this.showAbilityOptions(currentUnit);
        } else {
            this.enemyTurn(currentUnit);
        }
    }

    showAbilityOptions(character) {
        this.clearButtons();
        character.abilities.forEach((ability, index) => {
            this.add.text(300, 500 + index * 30, ability.name, { color: 'yellow' })
                .setInteractive()
                .on('pointerdown', () => this.performAttack(character, ability));
        });
    }

    selectTarget(sprite) {
        this.selectedTarget = sprite.getData('enemy');
        this.enemySprites.forEach(s => s.setTint(0xffffff)); // Reset colors
        sprite.setTint(0xff0000); // Highlight selected enemy
    }

    performAttack(attacker, ability) {
        if (!this.selectedTarget) return;

        this.selectedTarget.hp -= ability.damage;
        this.updateUI();

        if (this.selectedTarget.hp <= 0) {
            this.enemies = this.enemies.filter(e => e.hp > 0);
            this.enemySprites = this.enemySprites.filter(s => s.getData('enemy').hp > 0);
        }

        this.selectedTarget = null; // Reset target after attack
        this.nextTurn();
    }

    enemyTurn(enemy) {
        setTimeout(() => {
            const availableAbilities = enemy.abilities.filter(a => a.damage > 0);
            const chosenAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];

            const target = this.party[Math.floor(Math.random() * this.party.length)];
            target.stats.HP -= chosenAbility.damage;

            this.updateUI();

            if (target.stats.HP <= 0) {
                this.party = this.party.filter(p => p.stats.HP > 0);
            }

            this.nextTurn();
        }, 1000);
    }

    updateUI() {
        this.clearButtons();
        if (this.party.length === 0) {
            this.turnText.setText("Game Over");
        } else if (this.enemies.length === 0) {
            this.turnText.setText("Victory!");
        }
    }

    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        this.startTurn();
    }

    clearButtons() {
        this.children.list.forEach(child => {
            if (child.type === "Text" && child.style.color === "yellow") {
                child.destroy();
            }
        });
    }
};

export const BattleScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [party, setParty] = useState([]);
    const [enemies, setEnemies] = useState(location.state?.enemies || []);

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const response = await fetch('/api/characters');
                const data = await response.json();
                setParty(data);
            } catch (error) {
                console.error("Error fetching party:", error);
            }
        };
        fetchParty();
    }, []);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            scene: [BattleScene],
        };

        const game = new Phaser.Game(config);
        game.scene.start('BattleScene', { party, enemies });

        return () => game.destroy(true);
    }, [party, enemies]);

    return (
        <div>
            <div id="phaser-game"></div>
            <button onClick={() => navigate('/world')}>Exit Battle</button>
        </div>
    );
};

export default BattleScreen;
