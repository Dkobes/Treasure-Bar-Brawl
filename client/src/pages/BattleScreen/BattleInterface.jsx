import React, { useState } from 'react';
import './BattleInterface.css';

const BattleInterface = ({ characters, enemies, onAttack, battleLog, currentTurn }) => {
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [selectedAbility, setSelectedAbility] = useState(null);

    const handleAttack = (characterName, attackName) => {
        if (onAttack && selectedTarget) {
            onAttack(characterName, attackName, selectedTarget); 
            setSelectedTarget(null); 
            setSelectedAbility(null); 
        }
    };


    return (
        <div className='battle-interface nes-container is-rounded'>
            <div className='target-selection'>
                <h5 className='nes-text is-error'>Select Target</h5>
                <div className='target-options'>
                    {selectedAbility && selectedAbility.heal
                        ? characters.filter(character => character.health > 0).map((character) => (
                            <button
                                key={character.id}
                                className='nes-btn is-success'
                                onClick={() => setSelectedTarget(character.id)}
                            >
                                {character.name} (HP: {character.health})
                            </button>
                        ))
                        : enemies.filter(enemy => enemy.health > 0).map((enemy) => (
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
                                    character.level >= ability.level ? (
                                        <button
                                            key={ability.name}
                                            className='nes-btn is-primary'
                                            onClick={() => setSelectedAbility(ability)}
                                        >
                                            {ability.name}
                                        </button>
                                    ) : (
                                        null
                                    )
                                ))}
                                {selectedAbility && (
                                    <button
                                        className='nes-btn is-warning'
                                        onClick={() => handleAttack(character.id, selectedAbility.name)}
                                    >
                                        Use {selectedAbility.name}
                                    </button>
                                )}
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