import React from 'react';
import './BattleInterface.css';

const BattleInterface = ({ characters, onAttack, battleLog, currentTurn }) => {
    const handleAttack = (characterName, attackName) => {
        if (onAttack) {
            onAttack(characterName, attackName); // Trigger attack event
        }
    };

    const currentCharacter = characters.find(character => character.name === currentTurn);

    return (
        <div className='battle-interface nes-container is-rounded'>
            <div className='current-turn nes-text is-primary'>Current Turn: {currentTurn}</div>
            {currentCharacter && (
                <div className='character-info'>
                    <div className='character-name nes-text is-success'>{currentCharacter.name}</div>
                    <div className='attack-options'>
                        {currentCharacter.abilities.map((ability) => (
                            <button key={ability.name} className='nes-btn is-primary' onClick={() => handleAttack(currentCharacter.name, ability.name)}>
                                {ability.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className='battle-log nes-container is-dark'>
                <h3 className='nes-text is-warning'>Battle Log</h3>
                {battleLog.map((log, index) => (
                    <div key={index} className='nes-text'>{log}</div>
                ))}
            </div>
        </div>
    );
};

export default BattleInterface;