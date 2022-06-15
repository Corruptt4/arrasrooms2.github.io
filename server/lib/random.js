/*jslint node: true */
"use strict";

// Seed math

exports.random = x => {
    return x * Math.random();
};

exports.randomAngle = () => {
    return Math.PI * 2 * Math.random();
};

exports.randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

exports.irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1)); //Inclusive
};

exports.irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Inclusive
};

exports.gauss = (mean, deviation) => {
    let x1, x2, w;
    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        w = x1 * x1 + x2 * x2;
    } while (0 == w || w >= 1);

    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};

exports.gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = exports.gauss(0, range / clustering);

    while (output < 0) {
        output += range;
    }

    while (output > range) {
        output -= range;
    }

    return output + min;
};

exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2);
    let d = exports.gauss(radius, radius * clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    };
};

exports.chance = prob => {
    return exports.random(1) < prob;
};

exports.dice = sides => {
    return exports.random(sides) < 1;
};

exports.choose = arr => {
    return arr[exports.irandom(arr.length - 1)];
};

exports.chooseN = (arr, n) => {
    let o = [];
    for (let i = 0; i < n; i++) {
        o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
    }
    return o;
};

exports.chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function(value) {
        totalProb += value;
    });
    let answer = exports.random(totalProb);
    for (let i = 0; i < arg.length; i++) {
        if (answer < arg[i]) return i;
        answer -= arg[i];
    }
};


exports.chooseBotName = () => {
    return exports.choose([
        'DEV KEY: IAMLYINGTOYOU',
        'Bob',
        'bruh moment',
        'YO MAMA SO FAT',
        'Basic Tank',
        'Arena Closer',
        'Arena Opener',
        'Waffz_The_Pancake',
        'DogeisCut',
        'ｔｈｅ ｐａｉｎ',
        'XBOX LIVE',
        'farticle',
        'fartpoop',
        'Laz',
        'PLH',
        'tbh creature',
        'what',
        'FUCK',
        'o_o',
        'an unlikely amount of balls',
        'he',
        'youtu.be/v-6cZkxNt6I',
        'aaaaaaaaaaaaaaaaaaaaaa',
        'i thought it would be funny',
        'multiboxer 1',
        'multiboxer 2',
        'multiboxer 3',
        'multiboxer 4',
        'LOL',
        'Femboy',
        'V Furry V',
        'FurryFemboyLover2006',
        'james.brown2009',
        'arras.io',
        'diep.io',
        'carrassot2.glitch.me',
        'November',
        'You cannot undo this action',
        'Undo',
        'Redo',
        'Javascript',
        'Godot',
        'fortnite hater',
        'Sus tank',
        'Pentagon Farmer',
        'Litterally Harmless',
        'X-Ray',
        'doxxed: 143.45.254.21',
        'Photographic Evidence',
        '[AI] [AI] [AI] [AI] [AI] ',
        '',
    ]);
};

exports.chooseBossName = (code, n) => {
    switch (code) {
        case 'a':
            return exports.chooseN([
                'Archimedes',
                'Akilina',
                'Anastasios',
                'Athena',
                'Alkaios',
                'Amyntas',
                'Aniketos',
                'Artemis',
                'Anaxagoras',
                'Apollon',
            ], n);
        case 'castle':
            return exports.chooseN([
                'Berezhany',
                'Lutsk',
                'Dobromyl',
                'Akkerman',
                'Palanok',
                'Zolochiv',
                'Palanok',
                'Mangup',
                'Olseko',
                'Brody',
                'Isiaslav',
                'Kaffa',
                'Bilhorod',
            ], n);
        case 'all':
            return exports.chooseN([
                'Archimedes',
                'Akilina',
                'Anastasios',
                'Athena',
                'Alkaios',
                'Amyntas',
                'Aniketos',
                'Artemis',
                'Anaxagoras',
                'Apollon',
                'Berezhany',
                'Lutsk',
                'Dobromyl',
                'Akkerman',
                'Palanok',
                'Zolochiv',
                'Palanok',
                'Mangup',
                'Olseko',
                'Brody',
                'Isiaslav',
                'Kaffa',
                'Bilhorod',
            ], n);
        default:
            return 'God';
    }
};