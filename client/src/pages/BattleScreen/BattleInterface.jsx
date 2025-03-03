import React, { useState } from 'react';
import './BattleInterface.css';

const BattleInterface = ({ characters, enemies, onAttack, battleLog, currentTurn }) => {
    const [selectedTarget, setSelectedTarget] = useState(null);

    const handleAttack = (characterName, attackName) => {
        if (onAttack && selectedTarget) {
            onAttack(characterName, attackName, selectedTarget); // Trigger attack event
        }
    };

    const currentCharacter = characters.find(character => character.name === currentTurn);

    return (
        <div className='battle-interface nes-container is-rounded'>
            {currentCharacter && (
                <div className='character-info'>
                    <div className='character-name nes-text is-primary'>{currentCharacter.name}</div>
                    <div className='attack-options'>
                        {currentCharacter.abilities.map((ability) => (
                            <button key={ability.name} className='nes-btn is-primary' onClick={() => handleAttack(currentCharacter.name, ability.name)}>
                                {ability.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className='target-selection'>
                <h3 className='nes-text is-error'>Select Target</h3>
                <div className='target-options'>
                    {enemies.map((enemy) => (
                        <button key={enemy.id} className={`nes-btn ${selectedTarget === enemy.id ? 'is-warning' : ''}`} onClick={() => setSelectedTarget(enemy.id)}>
                            {enemy.name} 
                        </button>
                    ))}
                </div>
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