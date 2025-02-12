import { useState } from 'react';
import auth from '../../utils/auth';
import "nes.css/css/nes.min.css";

export const StartMenu = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <button>NEW GAME</button>
            <input
                name='username'
                type='text'
                placeholder='Please enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                name='password'
                type='password'
                placeholder='Please enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>CONTINUE</button>
            <input
                name='username'
                type='text'
                placeholder='Please enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                name='password'
                type='password'
                placeholder='Please enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}