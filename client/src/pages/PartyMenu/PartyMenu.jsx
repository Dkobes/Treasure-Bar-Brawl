import "nes.css/css/nes.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PartyMenu.css';

export const PartyMenu = () => {
    const navigate = useNavigate();
    const [party, setParty] = useState([]);
    const [saving, setSaving] = useState(false);

    const getSpriteUrl = (character) => character?.spriteUrl || '';

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const token = localStorage.getItem("id_token"); // Retrieve token from localStorage
                if (!token) throw new Error("No token found");

                const response = await fetch("/api/party", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch party data");
                const data = await response.json();
                setParty(data);
            } catch (error) {
                console.error("Error fetching party:", error);
            }
        };
        fetchParty();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("id_token");
            if (!token) throw new Error("No token found");

            const response = await fetch("/api/party", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ party }),
            });
    
            if (!response.ok) throw new Error("Failed to save party data");
    
            console.log("Party data saved successfully!");
        } catch (error) {
            console.error("Error saving party:", error);
        } finally {
            setSaving(false);
        }
    };
   
    return (
        <div className="party-menu-container with-title is-dark">
            <p className="title">Party Menu</p>
            {party.length > 0 ? (
                <div className="character-grid">
                    {party.map((character) => (
                        <div key={character.id || character.name} className="nes-container is-rounded is-light character-container">
                            <img src={getSpriteUrl(character)} alt={character?.name || "Unknown"} className="sprite" />
                            <div className="character-info">
                                <p className="nes-text is-primary">Character</p>
                                <p><strong>{character?.name || "Unnamed"}</strong> (Level {character?.stats?.Level || 1})</p>
                                <p>HP: {character?.stats?.HP || 0} | MP: {character?.stats?.MP || 0}</p>
                                <p>STR: {character?.stats?.Attack || 0} | MAG: {character?.stats?.Magic || 0} | DEF: {character?.stats?.Defense || 0}</p>
                                <p>RES: {character?.stats?.Resist || 0} | SPD: {character?.stats?.Speed || 0}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="nes-text is-warning">Loading party data...</p>
            )}
            <div className="button-container">
                <button className="nes-btn is-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "SAVE"}
                </button>
                <button className="nes-btn is-primary" onClick={() => navigate(-1)}>BACK</button>
                <button className="nes-btn is-error" onClick={() => navigate("/")}>QUIT</button>
            </div>
        </div>
    );
};

export default PartyMenu;
