import { useState } from 'react';
import auth from '../../utils/auth';
import "nes.css/css/nes.min.css";

export const StartMenu = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleSignup = () => setShowSignup(true);
    const handleLogin = () => setShowLogin(true);

    return (
        <div className="nes-container is-dark with-title" style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <div>
                {!showSignup && !showLogin && (
                    <>
                        <button className="nes-btn is-primary" onClick={handleSignup}>NEW GAME</button>
                        <br /><br />
                        <button className="nes-btn is-primary" onClick={handleLogin}>CONTINUE</button>
                    </>
                )}

                {showSignup && (
                    <div>
                        <p>Sign Up</p>
                        <input
                            className="nes-input"
                            name='username'
                            type='text'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="nes-input"
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="nes-btn is-warning">Submit</button>
                    </div>
                )}

                {showLogin && (
                    <div>
                        <p>Log In</p>
                        <input
                            className="nes-input"
                            name='username'
                            type='text'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="nes-input"
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="nes-btn is-warning">Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};
