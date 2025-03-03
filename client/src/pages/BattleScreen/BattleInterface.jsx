//import attacks from '../server/src/seeds/data.js';
// import React, { useEffect, useState } from 'react';
// import './BattleInterface.css';

// const BattleInterface = ({ characters, onAttack }) => {
//     const [attacks, setAttacks] = useState({});

//     useEffect(() => {
//         fetch('/attacks')
//         .then(response => response.json())
//         .then(data => {
//             setAttacks(data);
//         })
//         .catch(error => console.error('Error fetching attacks:', error));
//     }, []);
// };

//     const handleAttack = (characterName, attackName) => {
//         if (onAttack) {
//             onAttack(characterName, attackName); // Trigger attack event
//         }

//     return (
//         <div className='battle-interface'>
//             {characters.map((character) => (
//                 <div key={character.name} className='character-info'>
//                     <div className='character-name'>{character.name}</div>
//                     <div className='attack-options'>
//                         {attacks[character.name.toLowerCase()] ? (
//                     attacks[character.name.toLowerCase()].map((attack) => (
//                             <button key={attack.name} 
//                             onClick={() => handleAttack(character.name, attack.name)}>
//                             {attack.name}
//                             </button>
//                             ))
//                         ) : (
//                             <div>No attacks available</div>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
           

// export default BattleInterface;