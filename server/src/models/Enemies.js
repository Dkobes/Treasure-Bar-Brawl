import { Schema, model } from 'mongoose';

// Define the schema for stats
const statsSchema = new Schema({
    Speed: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    Resist: { type: Number, required: true },
    Magic: { type: Number, required: true },
    HP: { type: Number, required: true },
});

// Define the schema for abilities
const abilitySchema = new Schema({
    name: { type: String, required: true },
    damage: { type: Number},
    heal: { type: Number },
});

// Define the schema for each character
const enemySchema = new Schema({
    name: { type: String, required: true },
    alias: { type: String, required: true },
    stats: { type: statsSchema, required: true },
    experience: { type: Number, default: 0 },
    abilities: { type: [abilitySchema], required: true },
    alive: { type: Boolean, required: true }
});

// Create the model for characters
const Enemy = model('Enemy', enemySchema);

export default Enemy;