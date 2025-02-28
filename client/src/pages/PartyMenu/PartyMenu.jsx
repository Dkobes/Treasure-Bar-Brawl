import "nes.css/css/nes.min.css";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import './PartyMenu.css';
import baileighSprite from "../../assets/playerSprite/baileigh.png";
import coltonSprite from "../../assets/playerSprite/colton.png";
import dannySprite from "../../assets/playerSprite/danny.png";
import tylerSprite from "../../assets/playerSprite/tyler.png";

export const PartyMenu = () => {
    const navigate = useNavigate();
    const [party, setParty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const spriteMap = useMemo(() => ({
        Baileigh: baileighSprite,
        Colton: coltonSprite,
        Danny: dannySprite,
        Tyler: tylerSprite,
    }), []);

    const getSpriteUrl = (character) => spriteMap[character?.name] || "";

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const token = localStorage.getItem("id_token");
                if (!token) throw new Error("No token found");

                const username = localStorage.getItem("username");
                const response = await fetch(`/api/party/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch party data");

                const data = await response.json();
                setParty(data);
            } catch (error) {
                console.error("Error fetching party:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParty();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaveMessage("");

        try {
            const token = localStorage.getItem("id_token");
            if (!token) throw new Error("No token found");

            const username = localStorage.getItem("username");
            const response = await fetch(`/api/party/${username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ party }),
            });

            if (!response.ok) throw new Error("Failed to save party data");

            setSaveMessage("Party saved successfully!");
        } catch (error) {
            console.error("Error saving party:", error);
            setSaveMessage("Error saving party.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="party-menu-container with-title is-dark">
            <p className="title">Party Menu</p>

            {loading ? (
                <p className="nes-text is-warning">Loading party data...</p>
            ) : error ? (
                <p className="nes-text is-error">{error}</p>
            ) : party.length > 0 ? (
                <div className="character-grid">
                    {party.map((character) => (
                        <div key={character.id || character.name} className="nes-container is-rounded is-light character-container">
                            <img src={getSpriteUrl(character)} alt={character.name} className="sprite" />
                            <div className="character-info">
                                <p><strong className="nes-text is-primary">{character?.name || "Unnamed"}</strong> </p>
                                <p>(Level {character?.stats?.Level || 1})</p>
                                <p>HP: {character?.stats?.HP || 0} | MP: {character?.stats?.MP || 0}</p>
                                <p>STR: {character?.stats?.Attack || 0} | MAG: {character?.stats?.Magic || 0} | DEF: {character?.stats?.Defense || 0}</p>
                                <p>RES: {character?.stats?.Resist || 0} | SPD: {character?.stats?.Speed || 0}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="nes-text is-warning">No characters in party.</p>
            )}

            {saveMessage && <p className="nes-text is-success">{saveMessage}</p>}

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