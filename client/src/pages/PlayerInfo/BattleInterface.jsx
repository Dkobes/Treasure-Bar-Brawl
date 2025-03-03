import { attacks } from '../seeds/data.js';
import React from 'react';
import './BattleInterface.css';

const BattleInterface = ({ characters, onAttack }) => {
    const handleAttack = (characterName, attackName) => {
        if (onAttack) {
            onAttack(characterName, attackName); // Trigger attack event
        }
    };

    return (
        <div className='battle-interface'>
            {characters.map((character) => (
                <div key={character.name} className='character-info'>
                    <div className='character-name'>{character.name}</div>
                    <div className='attack-options'>
                    {attacks[character.name.toLowerCase()].map((attack) => (
                            <button key={attack.name} 
                            onClick={() => handleAttack(character.name,attack.name)}>
                            {attack.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
           

export default BattleInterface;