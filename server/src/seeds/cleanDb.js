import { Character, Enemy } from "../models/index.js";

const cleanDb = async () => {
    try {
        await Character.deleteMany({});
        console.log('Character collection cleaned.')

        await Enemy.deleteMany({});
        console.log('Character collection cleaned.');
    } catch (error) {
        console.error('Error cleaning collections:', error);
        process.exit(1);
    }
};

export default cleanDb;