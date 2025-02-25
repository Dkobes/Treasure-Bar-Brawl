import { Schema, model } from 'mongoose';

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
        { name: "Prayer", heal: 50, cooldown: 0.5 },
        { name: "Shield", damage: 100, cooldown: 1 },
        { name: "Holy Blade", damage: 200, cooldown: 2 }
    ]
});

// Save the character to the database
tyler.save();

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
danny.save();

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
baileigh.save();

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
colton.save();