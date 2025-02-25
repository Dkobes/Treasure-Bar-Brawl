import "nes.css/css/nes.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PartyMenu.css';

export const PartyMenu = () => {
    const navigate = useNavigate();
    const [party, setParty] = useState([]);

    const getSpriteUrl = (character) => character?.spriteUrl || '';

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const response = await fetch('/api/party'); // Fetch party data from the server
                if (!response.ok) throw new Error('Failed to fetch party data');
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
                    <div key={character.id || character.name} className="nes-container is-rounded is-light character-container">
                        <img src={getSpriteUrl(character)} alt={character?.name || "Unknown"} className="sprite" />
                        <p className="nes-text is-primary">Character</p>
                        <p><strong>{character?.name || "Unnamed"}</strong> (Level {character?.stats?.Level || 1})</p>
                        <p>HP: {character?.stats?.HP || 0} | MP: {character?.stats?.MP || 0}</p>
                        <p>STR: {character?.stats?.Attack || 0} | MAG: {character?.stats?.Magic || 0} | DEF: {character?.stats?.Defense || 0}</p>
                        <p>RES: {character?.stats?.Resist || 0} | SPD: {character?.stats?.Speed || 0}</p>
                    </div>
                ))
            ) : (
                <p className="nes-text is-warning">Loading party data...</p>
            )}
            <div className="button-container">
                <button className="nes-btn is-primary">SAVE</button>
                <button className="nes-btn is-primary" onClick={() => navigate(-1)}>BACK</button>
                <button className="nes-btn is-error" onClick={() => navigate("/")}>QUIT</button>
            </div>
        </div>
    );
};

export default PartyMenu;
