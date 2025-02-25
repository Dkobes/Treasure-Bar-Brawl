import db from '../config/connection.js';
import cleanDb from './cleanDb.js';
import { Character, Enemy } from '../models/index.js';
import { characters, enemies } from './data.js';

try {
    db.once('open', async () => {
        await cleanDb();

        await Character.insertMany(characters);
        await Enemy.insertMany(enemies);

        console.log('----Seeding Complete----');
        process.exit(0);
    })
} catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}