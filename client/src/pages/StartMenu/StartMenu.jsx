import { useState } from 'react';
import auth from '../../utils/auth';
import "nes.css/css/nes.min.css";
import './StartMenu.css';

const StartMenu = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [message, setMessage] = useState('');
    const [style, setStyle] = useState({visibility: 'hidden'});

    const handleSignup = () => setShowSignup(true);
    const handleLogin = () => setShowLogin(true);

    const signUp = async () => {
        if (username && password !== '') {
            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
                });

                const data = await response.json();

                console.log('Character successfully created!');

                auth.login(data.token);

                setUsername('');
                setPassword('');
                setStyle({visibility: 'hidden'});
            } catch(err) {
                console.error('Failed to create user: ', err);
            }
        } else if (!username && !password) {
            setMessage('username and password');
            setStyle({visibility: 'visible'});
        } else if (!username) {
            setMessage('username');
            setStyle({visibility: 'visible'});
        } else if (!password) {
            setMessage('password');
            setStyle({visibility: 'visible'});
        }
    }

    const login = async () => {
        if (username && password !== '') {
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
                });
    
                const data = await response.json();
    
                auth.login(data.token);
    
                console.log('Successfully logged in!');

                setUsername('');
                setPassword('');
                setStyle({visibility: 'hidden'});
            } catch (err) {
                console.error('Failed to fetch user info: ', err);
            }
        } else if (!username && !password) {
            setMessage('username and password');
            setStyle({visibility: 'visible'});
        } else if (!username) {
            setMessage('username');
            setStyle({visibility: 'visible'});
        } else if (!password) {
            setMessage('password');
            setStyle({visibility: 'visible'});
        }
    }

    return (
        <div className="nes-container is-dark with-title">
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
                        <p style={style}>Please enter a {message}</p>
                        <input
                            id='name_field'
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
                        <button className="nes-btn is-warning" onClick={signUp}>Submit</button>
                    </div>
                )}

                {showLogin && (
                    <div>
                        <p>Log In</p>
                        <p style={style}>Please enter {message}</p>
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
                        <button className="nes-btn is-warning" onClick={login}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartMenu;
