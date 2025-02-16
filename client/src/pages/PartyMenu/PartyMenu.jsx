import "nes.css/css/nes.min.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const PartyMenu = () => {
    const history = useHistory();
    const [party, setParty] = useState([
        { name: "Tyler", level: 1, hp: 200, mp: 50, stats: { str: 10, mag: 10, def: 10, res: 10, spd: 10 } },
        { name: "Colton", level: 1, hp: 120, mp: 120, stats: { str: 10, mag: 10, def: 10, res: 10, spd: 10 } },
        { name: "Baileigh", level: 1, hp: 150, mp: 120, stats: { str: 10, mag: 10, def: 10, res: 10, spd: 10 } },
        { name: "Danny", level: 1, hp: 180, mp: 50, stats: { str: 10, mag: 10, def: 10, res: 10, spd: 10 } }
    ]);

    return (
        <div className="nes-container with-title is-dark" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <p className="title">Party Menu</p>
            {party.map((character, index) => (
                <div key={index} className="nes-container is-rounded is-light" style={{ marginBottom: "10px", padding: "10px" }}>
                    <p><strong>{character.name}</strong> (Level {character.level})</p>
                    <p>HP: {character.hp} | MP: {character.mp}</p>
                    <p>STR: {character.stats.str} | MAG: {character.stats.mag} | DEF: {character.stats.def}</p>
                    <p>RES: {character.stats.res} | SPD: {character.stats.spd}</p>
                </div>
            ))}
            <div className="button-container" style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <button className="nes-btn is-primary">SAVE</button>
                <button className="nes-btn is-primary" onClick={() => history.goBack()}>BACK</button>
                <button className="nes-btn is-error">QUIT</button>
                
            </div>
        </div>
    );
};

export default PartyMenu;