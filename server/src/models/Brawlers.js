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
export const Character = model('Character', characterSchema);

const tyler = new Character({
    name: "Tyler",
    level: 1,
    stats: {
        Speed: 12,
        Attack: 16,
        Defense: 20,
        Resist: 18,
        Magic: 14,
    },
    abilities: [
        { name: "Prayer", heal: 100, cooldown: 0.5 },
        { name: "Holy Shock", damage: 100, cooldown: 1 },
        { name: "Holy Blade", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
tyler.save().catch(console.error);

const danny = new Character({
    name: "Danny",
    level: 1,
    stats: {
        Speed: 20,
        Attack: 18,
        Defense: 16,
        Resist: 14,
        Magic: 12,
    },
    abilities: [
        { name: "Sneak Attack", damage: 50, cooldown: 0.5 },
        { name: "Viper's Kiss", damage: 100, cooldown: 1 },
        { name: "Shadow Strike", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
danny.save().catch(console.error);

const baileigh = new Character({
    name: "Baileigh",
    level: 1,
    stats: {
        Speed: 18,
        Attack: 14,
        Defense: 12,
        Resist: 16,
        Magic: 20,
    },
    abilities: [
        { name: "Eldritch Blast", damage: 50, cooldown: 0.5 },
        { name: "Shatter", damage: 100, cooldown: 1 },
        { name: "Shadow Curse", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
baileigh.save().catch(console.error);

const colton = new Character({
    name: "Colton",
    level: 1,
    stats: {
        Speed: 16,
        Attack: 18,
        Defense: 12,
        Resist: 14,
        Magic: 20,
    },
    abilities: [
        { name: "Fire Bolt", damage: 50, cooldown: 0.5 },
        { name: "Fireball", damage: 100, cooldown: 1 },
        { name: "Meteor Swarm", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
colton.save().catch(console.error);