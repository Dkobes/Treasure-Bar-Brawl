const tyler = {
    name: "Tyler",
    level: 1,
    spriteUrl: "/assets/playerSprite/tyler.png",
    stats: {
        Speed: 12,
        Attack: 16,
        Defense: 20,
        Resist: 18,
        Magic: 14,
    },
    abilities: [
        { name: "Prayer", heal: 100, cooldown: 0.5 },
        { name: "Holy Bolt", damage: 100, cooldown: 1 },
        { name: "Holy Blade", damage: 200, cooldown: 2 }
    ]
};

const danny = {
    name: "Danny",
    level: 1,
    spriteUrl: "/assets/playerSprite/danny.png",
    stats: {
        Speed: 20,
        Attack: 18,
        Defense: 16,
        Resist: 14,
        Magic: 12,
    },
    abilities: [
        { name: "Sneak Attack", damage: 50, cooldown: 0.5 },
        { name: "Poison", damage: 100, cooldown: 1 },
        { name: "Shadow Strike", damage: 200, cooldown: 2 }
    ]
};

const baileigh = {
    name: "Baileigh",
    level: 1,
    spriteUrl: "/assets/playerSprite/baileigh.png",
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
};

const colton = {
    name: "Colton",
    level: 1,
    spriteUrl: "/assets/playerSprite/colton.png",
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
        { name: "Meteor Shower", damage: 200, cooldown: 2 }
    ]
};

const skeleton = {
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
    ],
    alive: true
};

const vampirate = {
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
        { name: "Bite", damage: 100, heal: 25, cooldown: 1 },
        { name: "Hook", damage: 150, cooldown: 2 }
    ],
    alive: true
};

const iceElf = {
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
    ],
    alive: true
};

const iceBear = {
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
        { name: "Maul", damage: 100, cooldown: 1 },
    ],
    alive: true
};

const grandma = {
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
    ],
    alive: true
};

const kitty = {
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
    ],
    alive: true
};

const stanTheSorcerer = {
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
        { name: "Typescript Tornado", damage: 100, cooldown: 1 },
        { name: "Energy Break", heal: 50, cooldown: 1 },
        { name: "MERNder", damage: 300, cooldown: 3 },
    ],
    alive: true
};

const dragon = {
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
    ],
    alive: true
};

const characters = [tyler, danny, baileigh, colton];
const enemies = [skeleton, vampirate, iceElf, iceBear, grandma, kitty, stanTheSorcerer, dragon];

export { characters, enemies };