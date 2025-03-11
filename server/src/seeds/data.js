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
        HP: 150,
    },
    abilities: [
        { name: "Prayer", heal: 100, level: 1 },
        { name: "Holy Bolt", damage: 100, level: 3 },
        { name: "Holy Blade", damage: 200, level: 5 }
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
        HP: 150,
    },
    abilities: [
        { name: "Sneak Attack", damage: 50, level: 1 },
        { name: "Poison", damage: 100, level: 3 },
        { name: "Shadow Strike", damage: 200, level: 5 }
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
        HP: 150,
    },
    abilities: [
        { name: "Eldritch Blast", damage: 50, level: 1 },
        { name: "Shatter", damage: 100, level: 3 },
        { name: "Shadow Curse", damage: 200, level: 5 }
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
        HP: 150,
    },
    abilities: [
        { name: "Fire Bolt", damage: 50, level: 1 },
        { name: "Fireball", damage: 100, level: 3 },
        { name: "Meteor Shower", damage: 200, level: 5 }
    ]
};

const skeleton = {
    name: "Skeleton",
    alias: 'skeleton',
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 100,
    },
    experience: 5,
    abilities: [
        { name: "Attack", damage: 50 },
        { name: "Femur Fling", damage: 100 }
    ],
    alive: true
};

const vampirate = {
    name: "Vampirate",
    alias: 'vampirate',
    stats: {
        Speed: 18,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 150,
    },
    experience: 10,
    abilities: [
        { name: "Attack", damage: 25 },
        { name: "Bite", damage: 75},
        { name: "Hook", damage: 100}
    ],
    alive: true
};

const iceElf = {
    name: "Ice Elf",
    alias: 'iceElf',
    stats: {
        Speed: 25,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 300
    },
    experience: 15,
    abilities: [
        { name: "Attack", damage: 50},
        { name: "Ice Arrow", damage: 100},
    ],
    alive: true
};

const iceBear = {
    name: "Ice Bear",
    alias: 'iceBear',
    stats: {
        Speed: 20,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 350,
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
    alias: 'grandma',
    stats: {
        Speed: 10,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 500,
    },
    experience: 20,
    abilities: [
        { name: "Attack", damage: 25},
        { name: "Eat More", damage: 200},
    ],
    alive: true
};

const kitty = {
    name: "Kitty",
    alias: 'kitty',
    stats: {
        Speed: 30,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 200,
    },
    experience: 20,
    abilities: [
        { name: "Attack", damage: 50},
        { name: "Feline Frenzy", damage: 100},
    ],
    alive: true
};

const stanTheSorcerer = {
    name: "Stan the Sorcerer",
    alias: 'stan',
    stats: {
        Speed: 15,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 1000,
    },
    experience: 100,
    abilities: [
        { name: "JavaScript Slash", damage: 100 },
        { name: "Typescript Tornado", damage: 150},
        { name: "Energy Break", heal: 300 },
        { name: "MERNder", damage: 300 },
    ],
    alive: true
};

const dragon = {
    name: "Dragon",
    alias: 'dragon',
    stats: {
        Speed: 20,
        Attack: 10,
        Defense: 10,
        Resist: 10,
        Magic: 10,
        HP: 2000,
    },
    experience: 500,
    abilities: [
        { name: "Fire Breath", damage: 50},
        { name: "Amlug Roar", damage: 100},
        { name: "Coin Fling", heal: 500},
        { name: "Dragon's Fury", damage: 300},
    ],
    alive: true
};

const characters = [tyler, danny, baileigh, colton];
const enemies = [skeleton, vampirate, iceElf, iceBear, grandma, kitty, stanTheSorcerer, dragon];

export { characters, enemies };