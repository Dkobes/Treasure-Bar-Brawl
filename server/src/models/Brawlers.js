import { Schema, model } from 'mongoose';

// const xpThresholds = [0, 15, 30, 60, 120, 240, 480];

// Define the schema for stats
const statsSchema = new Schema({
    Speed: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    Resist: { type: Number, required: true },
    Magic: { type: Number, required: true }
});

// Define the schema for abilities
const abilitySchema = new Schema({
    name: { type: String, required: true },
    damage: { type: Number },
    heal: { type: Number },
    cooldown: { type: Number, required: true }
});

// Define the schema for each character
const characterSchema = new Schema({
    name: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    stats: { type: statsSchema, required: true },
    experience: { type: Number, default: 0 },
    abilities: { type: [abilitySchema], required: true }
});

// Level-up function
// const checkLevelUp = (character) => {
//     let currentLevel = character.level;
//     let currentXP = character.experience;

//     while (currentLevel < xpThresholds.length - 1 && currentXP >= xpThresholds[currentLevel]) {
//         currentLevel++;
//         increaseStats(character);
//     }

//     character.level = currentLevel;
// };

// // Function to increase stats upon leveling up
// const increaseStats = (character) => {
//     character.stats.Speed += 1;
//     character.stats.Attack += 2;
//     character.stats.Defense += 2;
//     character.stats.Resist += 2;
//     character.stats.Magic += 2;
// };

// // Method to add XP and check for level-up
// characterSchema.methods.gainXP = function (xp) {
//     this.experience += xp;
//     checkLevelUp(this);
// };

// Create the model for characters
const Character = model('Character', characterSchema);

export default Character;