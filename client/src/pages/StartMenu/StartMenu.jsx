import { useState, useEffect } from 'react';
import auth from '../../utils/auth';
import "nes.css/css/nes.min.css";
import './StartMenu.css';
import { useNavigate } from 'react-router-dom';

const StartMenu = () => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [message, setMessage] = useState('');
    const [style, setStyle] = useState({visibility: 'hidden'});

    const handleSignup = () => setShowSignup(true);
    const handleLogin = () => setShowLogin(true);
    
    const checkUsername = async () => {
        try {
            const response = await fetch(`/api/users/${username}`, {
                'Content-Type': 'application/json',
            });

            if (response.ok) {
                setMessage('That username is already taken');
                setStyle({visibility: 'visible'});
            } else if (!response.ok) {
                setMessage('');
                setStyle({visibility: 'hidden'});
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    }

    const signUp = async () => {
        if (username && password !== '') {
            try {
                checkUsername();

                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
                });

                const data = await response.json();

                auth.login(data.token);

                if (response.ok) {
                    localStorage.setItem('username', username);
                    console.log('User successfully created!');
                    Navigate('/world');
                }
            } catch(err) {
                console.error('Failed to create user: ', err);
            }
        } else if (!username && !password) {
            setMessage('Please enter a username and password');
            setStyle({visibility: 'visible'});
        } else if (!username) {
            setMessage('Please enter a username');
            setStyle({visibility: 'visible'});
        } else if (!password) {
            setMessage('Please enter a password');
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

                setUsername('');
                setPassword('');
                setStyle({visibility: 'hidden'});

                if (!response.ok) {
                    setMessage('Please enter a valid username and password');
                    setStyle({visibility: 'visible'})
                }

                if (response.ok) {
                    localStorage.setItem('username', username);
                    console.log('Successfully logged in!');
                    Navigate('/world');
                }
            } catch (err) {
                console.error('Failed to fetch user info: ', err);
            }
        } else if (!username && !password) {
            setMessage('Please enter a username and password');
            setStyle({visibility: 'visible'});
        } else if (!username) {
            setMessage('Please enter a username');
            setStyle({visibility: 'visible'});
        } else if (!password) {
            setMessage('Please enter a password');
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
                        <p style={style}>{message}</p>
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
                        <button className="nes-btn is-primary" onClick={signUp}>SUBMIT</button>
                        <button className="nes-btn is-primary" onClick={() => setShowSignup(false)}>BACK</button>
                    </div>
                )}

                {showLogin && (
                    <div>
                        <p>Log In</p>
                        <p style={style}>{message}</p>
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
                        <button className="nes-btn is-primary" onClick={login}>SUBMIT</button>
                        <button className="nes-btn is-primary" onClick={() => setShowLogin(false)}>BACK</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartMenu;
