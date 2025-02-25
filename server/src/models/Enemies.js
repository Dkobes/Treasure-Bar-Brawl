import { Schema, model } from 'mongoose';

// Define the schema for each character
const enemySchema = new Schema({
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
export const Enemy = model('Enemy', enemySchema);

const skeleton = new Enemy({
    name: "Skeleton",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 5,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Femur Fling", damage: 100, cooldown: 2 }
    ]
});

// Save the character to the database
skeleton.save().catch(console.error);

const vampirate = new Enemy({
    name: "Vampirate",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 10,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Bite", damage: 100, cooldown: 1 },
        { name: "Hook Slash", damage: 150, cooldown: 2 }
    ]
});

// Save the character to the database
vampirate.save().catch(console.error);

const iceElf = new Enemy({
    name: "Ice Elf",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 15,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Ice Arrow", damage: 100, cooldown: 1 },
    ]
});

// Save the character to the database
iceElf.save().catch(console.error);

const iceBear = new Enemy({
    name: "Ice Bear",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 15,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Gouge", damage: 100, cooldown: 1 },
    ]
});

// Save the character to the database
iceBear.save().catch(console.error);

const grandma = new Enemy({
    name: "Grandma",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 20,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Eat More", damage: 100, cooldown: 1 },
    ]
});

// Save the character to the database
grandma.save().catch(console.error);

const kitty = new Enemy({
    name: "Kitty",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 20,
    abilities: [
        { name: "Attack", damage: 50, cooldown: 0.5 },
        { name: "Feline Frenzy", damage: 100, cooldown: 2 },
    ]
});

// Save the character to the database
kitty.save().catch(console.error);

const stanTheSorcerer = new Enemy({
    name: "Stan the Sorcerer",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 30,
    abilities: [
        { name: "JavaScript Slash", damage: 50, cooldown: 0.5 },
        { name: "Typescript Typhoon", damage: 100, cooldown: 1 },
        { name: "Energy Break", damage: 50, cooldown: 1 },
        { name: "MERNder", damage: 300, cooldown: 3 },
    ]
});

// Save the character to the database
stanTheSorcerer.save().catch(console.error);

const dragon = new Enemy({
    name: "Dragon",
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
    },
    experience: 50,
    abilities: [
        { name: "Fire Breath", damage: 50, cooldown: 0.5 },
        { name: "Amlug Roar", damage: 100, cooldown: 1 },
        { name: "Coin Fling", damage: 50, cooldown: 1 },
        { name: "Dragons' Fury", damage: 200, cooldown: 2 },
    ]
});

// Save the character to the database
dragon.save().catch(console.error);