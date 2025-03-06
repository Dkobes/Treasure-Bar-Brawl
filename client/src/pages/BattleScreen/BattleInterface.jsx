import React, { useState } from 'react';
import './BattleInterface.css';

const BattleInterface = ({ characters, enemies, onAttack, battleLog, currentTurn }) => {
    const [selectedTarget, setSelectedTarget] = useState(null);

    const handleAttack = (characterName, attackName) => {
        if (onAttack && selectedTarget) {
            onAttack(characterName, attackName, selectedTarget); // Trigger attack event
            setSelectedTarget(null); // Reset target after attack
        }
    };

    return (
        <div className='battle-interface nes-container is-rounded'>
            <div className='target-selection'>
                <h5 className='nes-text is-error'>Select Target</h5>
                <div className='target-options'>
                    {enemies.map((enemy) => (
                        <button
                            key={enemy.id}
                            className='nes-btn is-error'
                            onClick={() => setSelectedTarget(enemy.id)}
                        >
                            {enemy.name} (HP: {enemy.health})
                        </button>
                    ))}
                </div>
            </div>
            <div className='characters-info'>
                {characters.map((character) => (
                    <div
                        key={character.name}
                        className={`character-info ${character.name === currentTurn ? 'current-turn' : ''}`}
                    >
                        <div className='character-name nes-text is-primary'>{character.name}</div>
                        <div className='character-health nes-text'>
                            Health: {character.health} / {character.stats.HP}
                        </div>
                        {character.name === currentTurn && (
                            <div className='attack-options'>
                                {character.abilities.map((ability) => (
                                    <button
                                        key={ability.name}
                                        className='nes-btn is-primary'
                                        onClick={() => handleAttack(character.name, ability.name)}
                                    >
                                        {ability.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='battle-log nes-container is-dark'>
                <h3 className='nes-text is-warning'>Battle Log</h3>
                {battleLog.length > 0 && (
                    <div className='nes-text'>{battleLog[battleLog.length - 1]}</div>
                )}
            </div>
            
        </div>
    );
};

export default BattleInterface;