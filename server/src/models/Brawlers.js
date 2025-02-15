import { Schema, model } from 'mongoose';

// Define the schema for each character
const characterSchema = new Schema({
    name: { type: String, required: true, unique: true },
    stats: { type: statsSchema, required: true },
    experience: { type: Number, default: 0 },
    abilities: { type: [abilitySchema], required: true }
});

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
    damage: { type: Number, required: true },
    cooldown: { type: Number, required: true }
});

// Create the model for characters
export const Character = model('Character', characterSchema);

const tyler = new Character({
    name: "Tyler",
    stats: {
        Speed: 12,
        Attack: 20,
        Defense: 18,
        Resist: 14,
        Magic: 16,
    },
    abilities: [
        { name: "Punch", damage: 50, cooldown: 0.5 },
        { name: "Kick", damage: 100, cooldown: 1 },
        { name: "Slap", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
tyler.save();

const danny = new Character({
    name: "Danny",
    stats: {
        Speed: 20,
        Attack: 18,
        Defense: 16,
        Resist: 14,
        Magic: 12,
    },
    abilities: [
        { name: "Sneak attack", damage: 50, cooldown: 0.5 },
        { name: "Attack2", damage: 100, cooldown: 1 },
        { name: "Attack3", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
danny.save();

const baileigh = new Character({
    name: "Baileigh",
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
baileigh.save();

const colton = new Character({
    name: "Colton",
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
        { name: "Fire Meteor", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
colton.save();