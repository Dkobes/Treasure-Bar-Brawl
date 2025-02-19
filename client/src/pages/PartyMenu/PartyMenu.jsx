import "nes.css/css/nes.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PartyMenu.css';

export const PartyMenu = () => {
    const navigate = useNavigate();
    const [party, setParty] = useState([]);

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const response = await fetch('/api/party'); // Fetch party data from the server
                const data = await response.json();
                setParty(data);
            } catch (error) {
                console.error("Error fetching party:", error);
            }
        };
        fetchParty();
    }, []);

    return (
        <div className="nes-container with-title is-dark">
            <p className="title">Party Menu</p>
            {party.length > 0 ? (
                party.map((character, index) => (
                    <div key={index} className="nes-container is-rounded is-light character-container">
                        <p><strong>{character.name}</strong> (Level {character.stats.Level})</p>
                        <p>HP: {character.stats.HP} | MP: {character.stats.MP}</p>
                        <p>STR: {character.stats.Attack} | MAG: {character.stats.Magic} | DEF: {character.stats.Defense}</p>
                        <p>RES: {character.stats.Resist} | SPD: {character.stats.Speed}</p>
                    </div>
                ))
            ) : (
                <p className="nes-text is-warning">Loading party data...</p>
            )}
            <div className="button-container">
                <button className="nes-btn is-primary">SAVE</button>
                <button className="nes-btn is-primary" onClick={() => navigate(-1)}>BACK</button>
                <button className="nes-btn is-error">QUIT</button>
            </div>
        </div>
    );
};

export default PartyMenu;
