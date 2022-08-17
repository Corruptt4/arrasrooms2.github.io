// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  trap: [39, 1, .25, .65, 1.025, .325, 1.1, 4.9, 1, 1.125, 1, 15, 3],
    swarm: [27, .25, .05, .4, .9, .235, .65, 3.5, 1, 1, 1.25, 5, 1.25],
    drone: [66, .25, .1, .6, 5, .295, 1, 2.35, 1, 1, 1, .1, 1.1],
    bigdrone: [30, 0.25, 0.1, 1.5, 2.5, 2, 1, 1.5, 1, 1, 1, 0.1, 1],
    verybigdrone: [10, 0.25, 0.1, 2.25, 5, 3, 1, 1.5, 1, 1, 1, 0.1, 1],
    factory: [72, 1, .1, .7, 2, .2, 1, 3, 1, 1, 1, .1, 1],
    basic: [18.25, 1.4, .1, 1, 2, .2, 1, 4.5, 1, 1, 1, 15, 1],
    destroyerDominator: [6.5, 0, 1, .975, 6, 6, 6, .575, .475, 1, 1, .5, 1],
    gunnerDominator: [1.1, 0, 1.1, .5, .5, .5, 1, 1.1, 1, 1, .9, 1.2, .8],
    trapperDominator: [1.26, 0, .25, 1, 1.25, 1.45, 1.6, .5, 2, .7, 1, .5, 1],
    mothership: [1.25, 1, 1, 1, 1, 1, 1.1, .775, .8, 15, 1, 1, 1.15],
    closer: [1.25, .25, 1, 1, 1e3, 1e3, 1e3, 2.5, 2.25, 1.4, 4, .25, 1],
    blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, .9, .7, 1, 1, 1, 1.05],
    hurricane: [1, 1, 1, 1, 1.3, 1.3, 1.1, 1.5, 1.15, 1, 1, 1, 1],
    minion: [1, 1, 2, 1, .4, .4, 1.2, 1, 1, .75, 1, 2, 1],
    single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
    sniper: [1.35, 1, .25, 1, 1, .8, 1.1, 1.5, 1.5, 1, 1.5, .2, 1.15],
    rifle: [.8, .8, 1.5, 1, .8, .8, .9, 1, 1, 1, 1, 2, 1],
    assass: [1.65, 1, .25, 1, 1.15, 1, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
    hunter: [1.5, .7, 1, .95, 1, .9, 1, 1.1, .8, 1, 1.2, 1, 1.15],
    hunter2: [1, 1, 1, .9, 2, .5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
    preda: [1.4, 1, 1, .8, 1.5, .9, 1.2, .9, .9, 1, 1, 1, 1],
    snake: [.4, 1, 4, 1, 1.5, .9, 1.2, .2, .35, 1, 3, 6, .5],
    sidewind: [1.5, 2, 1, 1, 1.5, .9, 1, .15, .5, 1, 1, 1, 1],
    snakeskin: [.6, 1, 2, 1, .5, .5, 1, 1, .2, .4, 1, 5, 1],
    mach: [.5, .8, 1.7, 1, .7, .7, 1, 1, .8, 1, 1, 2.5, 1],
    blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, .6, .8, .33, .6, .5, 1.5, .8],
    chain: [1.25, 1.33, .8, 1, .8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, .5, 1.1],
    mini: [1.25, .6, 1, .8, .55, .45, 1.25, 1.33, 1, 1, 1.25, .5, 1.1],
    stream: [1.1, .6, 1, 1, 1, .65, 1, 1.24, 1, 1, 1, 1, 1],
    shotgun: [8, .4, 1, 1.5, 1, .4, .8, 1.8, .6, 1, 1.2, 1.2, 1],
    flank: [1, 1.2, 1, 1, 1.02, .81, .9, 1, .85, 1, 1.2, 1, 1],
    tri: [1, .9, 1, 1, .9, 1, 1, .8, .8, .6, 1, 1, 1],
    trifront: [1, .2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
    thruster: [1, 1.5, 2, 1, .5, .5, .7, 1, 1, 1, 1, .5, .7],
    auto: [1.8, .75, .5, .8, .9, .6, 1.2, 1.1, 1, .8, 1.3, 1, 1.25],
    five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
    autosnipe: [1, 1, 1, 1.4, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    pound: [2, 1.6, 1, 1, 1, 2, 1, .85, .8, 1, 1.5, 1, 1.15],
    destroy: [2.2, 1.8, .5, 1, 2, 2, 1.2, .65, .5, 1, 2, 1, 3],
    anni: [.8, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    hive: [1.5, .8, 1, .8, .7, .3, 1, 1, .6, 1, 1, 1, 1],
    arty: [1.2, .7, 1, .9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
    mortar: [1.2, 1, 1, 1, 1.1, 1, 1, .8, .8, 1, 1, 1, 1],
    spreadmain: [.78125, .25, .5, 1, .5, 1, 1, 1.5 / .78, .9 / .78, 1, 1, 1, 1],
    spread: [1.5, 1, .25, 1, 1, 1, 1, .7, .7, 1, 1, .25, 1],
    skim: [1, .8, .8, .9, 1.35, .8, 2, .3, .3, 1, 1, 1, 1.1],
    twin: [1, .5, .9, 1, .9, .7, 1, 1, 1, 1, 1, 1.2, 1],
    bent: [1.1, 1, .8, 1, .9, 1, .8, 1, 1, 1, .8, .5, 1],
    triple: [1.2, .667, .9, 1, .85, .85, .9, 1, 1, 1, 1.1, .9, .95],
    quint: [1.5, .667, .9, 1, 1, 1, .9, 1, 1, 1, 1.1, .9, .95],
    dual: [2, 1, .8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
    double: [1, 1, 1, 1, 1, .9, 1, 1, 1, 1, 1, 1, 1],
    hewn: [1.25, 1.5, 1, 1, .9, .85, 1, 1, .9, 1, 1, 1, 1],
    puregunner: [1, .25, 1.5, 1.2, 1.35, .25, 1.25, .8, .65, 1, 1.5, 1.5, 1.2],
    machgun: [.66, .8, 2, 1, 1, .75, 1, 1.2, .8, 1, 1, 2.5, 1],
    gunner: [1.25, .25, 1.5, 1.1, 1, .35, 1.35, .9, .8, 1, 1.5, 1.5, 1.2],
    power: [1, 1, .6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, .5, 1.5],
    nail: [.85, 2.5, 1, .8, 1, .7, 1, 1, 1, 1, 2, 1, 1],
    fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
    turret: [2, 1, 1, 1, .8, .6, .7, 1, 1, 1, .1, 1, 1],
    battle: [1, 1, 1, 1, 1.25, 1.15, 1, 1, .85, 1, 1, 1, 1.1],
    bees: [1.3, 1, 1, 1.4, 1, 1.5, .5, 3, 1.5, 1, .25, 1, 1],
    carrier: [1.5, 1, 1, 1, 1, .8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
    hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, .8, 1, .5, 1, 1, 1],
    block: [1.1, 2, .1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
    construct: [1.3, 1, 1, .9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
    boomerang: [.8, 1, 1, 1, .5, .5, 1, .75, .75, 1.333, 1, 1, 1],
    over: [1.25, 1, 1, .85, .7, .8, 1, 1, .9, 1, 2, 1, 1],
    meta: [1.333, 1, 1, 1, 1, .667, 1, 1, 1, 1, 1, 1, 1],
    overdrive: [5, 1, 1, 1, .8, .8, .8, .9, .9, .9, 1, 1.2, 1],
    weak: [2, 1, 1, 1, .6, .6, .8, .5, .7, .25, .3, 1, 1],
    master: [3, 1, 1, .7, .4, .7, 1, 1, 1, .1, .5, 1, 1],
    sunchip: [5, 1, 1, 1.4, .5, .4, .6, 1, 1, 1, .8, 1, 1],
    male: [.5, 1, 1, 1.05, 1.15, 1.15, 1.15, .8, .8, 1, 1.15, 1, 1],
    babyfactory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
    lowpower: [1, 1, 2, 1, .5, .5, .7, 1, 1, 1, 1, .5, .7],
    halfrecoil: [1, .5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morerecoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    muchmorerecoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lotsmorrecoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    tonsmorrecoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublerecoil: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublereload: [.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morereload: [.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    halfreload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lessreload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    threequartersrof: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morespeed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
    bitlessspeed: [1, 1, 1, 1, 1, 1, 1, .93, .93, 1, 1, 1, 1],
    slow: [1, 1, 1, 1, 1, 1, 1, .7, .7, 1, 1, 1, 1],
    halfspeed: [1, 1, 1, 1, 1, 1, 1, .5, .5, 1, 1, 1, 1],
    thirdreload: [0.3, 1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1, 1],
    notdense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .1, 1, 1],
    halfrange: [1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1],
    fake: [1, 1, 1, 1e-5, 1e-4, 1, 1, 1e-5, 2, 0, 1, 1, 1],
    healer: [1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
    op: [.5, 1.3, 1, 1, 4, 4, 4, 3, 2, 1, 5, 2, 1],
    protectorswarm: [5, 1e-6, 1, 1, 100, 1, 1, 1, 1, .5, 5, 1, 10],
    summoner: [.3, 1, 1, 1.125, .4, .345, .4, 1, 1, 1, .8, 1, 1],
    nest_keeper: [3, 1, 1, .75, 1.05, 1.05, 1.1, .5, .5, .5, 1.1, 1, 1],
    more_speed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
    one_third_reload: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    twist:      [1,     1,     1,      0.75,   1,      1,      1,      1,      1,      1,      1,      1,      1],   
  
    halfsize:           [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1], 
  
    octoblock:          [6,     1,     1,      1,      1,      0.5,      1,      4,      1,      0.4,    1,      1,      1], 
  
    omega:              [0.2,   1,     1,      2,      1,      1,      1,      3,      1,      3,      1,      1,      1],
  
    weiner:             [1,     1,     1,      999999,   0.1,    9999999999999,0.001,  0.01,   1,      0.01,   1,      1,      1],
  
    explosivetrap:      [6,     0.3,     1,      1,      1,      0.8,      1,      1,      1,      0.3,   100,    1,      10],
  
    dronedestroy:       [1,     1.8,   0.5,    1,      2,      2,      1.2,    0.90,   0.5,    1,      2,      1,      3],
    charge:             [5,    1.4,   0.1,    1,      1,      0.75,   1,      -4.5,    1,   0.1,      1,      180,     1], 
  
  morerange:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1], 
                        // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  lance:                [1,     0,             0.01,                8,    1,     0.1,        3,        1,      0,        0.2,      2,            0.001,              1],  
  
  lancereal:           [0.085, 0, 1, 1, 0.05, 17.575, 1.777, 0.088, 1, 0.05, 1, 12, 1],
  
  morehealth:           [1,     1,     1,      1,      2,      1,      2,      1,      1,      1,      1,      1,      1], 
  
  lesshealth:           [1,     1,     1,      1,      0.5,      1,      2,      1,      1,      1,      1,      1,      1], 
  
  moredamge:            [1,     1,     1,      1,      1,      2,      1,      1,      1,      1,      1,      1,      1], 
  
  damage4health:            [1,     1,     1,      1,      0.5,      2,      1,      1,      1,      1,      1,      1,      1], 
  
  health4damage:            [1,     1,     1,      1,      2,      0.5,      1,      1,      1,      1,      1,      1,      1], 
  
  lessspeed:            [1,     1,     1,      1,      1,      1,      1,      0.6,    0.6,    1,      1,      1,      1],
  // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  
  vacuum: [2, 0, 1, 1.2, 999999, 0, 999999, 10, 10, 0.08, 10, 1, 1],
  vacuumRecoil: [2.2, 0.85, 1, 1.2, 999999, 0, 999999, 10, 10, 0.08, 10, 1, 1],
  
  archer:               [      0.1,   0.5,             1,                1,    1.5,   0.03,       5,        2,        2,      0.25,        1,        1,                      1], 
  
  norecoil:             [1,     0,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
  
  flare:             [1,     1,   1,      1,      0.7,      1,      1,      1,      1,      1,      1,      1,      1], 
  
  debugnofire:             [99999999,     1,   1,      0,      0,      0,      0,      0,      0,      0,      1,      1,      1], 
  
  noshudder:  [1, 1, 0.01, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  halfhealth:  [1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
  whatthe: [0.03703703703, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  
  deflector: [0.01, 0, 1, 0.7, 9999, 0, 0, 0.01, 0.01, 0.04, 1, 1, 1],
  
  minionswarmer: [0.4, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1],
  
  halfstats: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  halfnerf: [2, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1],
  clonerbuff: [0.7, 1, 1, 1, 0.8, 0.7, 2, 2, 2, 1, 1, 1, 1],
  
  blackhole: [1, 1, 1, 1, 0.7, 0.8, 1, 1, 1, 1, 1, 1, 1],
  
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    lance: 7,
    deflector: 8,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
    lance: 9,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    SHOOT_ON_DEATH: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};
const basePolygonDamage = 1;
const basePolygonHealth = 2;
// FOOD
exports.food = {
    TYPE: "food",
    DAMAGE_CLASS: 1,
    CONTROLLERS: ["moveInCircles"],
    HITS_OWN_TYPE: "repel",
    MOTION_TYPE: "drift",
    FACING_TYPE: "turnWithSpeed",
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false
};
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Alpha Pentagon",
    VALUE: 15e3,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4
    },
    LABEL: "Beta Pentagon",
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: .2
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3
    },
    LABEL: "Pentagon",
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2
    },
    LABEL: "Triangle",
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5
    },
    DRAW_HEALTH: true
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1
    },
    LABEL: "Square",
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0
    },
    LABEL: "Egg",
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: .0011,
        PUSHABILITY: 0
    },
    DRAW_HEALTH: false
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: "Shiny Pentagon",
    GIVE_KILL_MESSAGE: true,
    VALUE: 3e4,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: "Shiny Triangle",
    GIVE_KILL_MESSAGE: true,
    VALUE: 7e3,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: "Shiny Square",
    GIVE_KILL_MESSAGE: true,
    VALUE: 2e3,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: .5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    FOOD: {
        LEVEL: 6
    }
};
exports.gem = {
    PARENT: [exports.food],
    LABEL: "Gem",
    GIVE_KILL_MESSAGE: true,
    VALUE: 2e3,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: .25
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    FOOD: {
        LEVEL: 6
    }
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
exports.flare = {
    PARENT: [exports.bullet],
    LABEL: 'Flare',
    SHAPE: 4,
    MOTION_TYPE: 'grow',
};
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.autobee = {
        PARENT: [exports.autoswarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.homingbullet = {
        PARENT: [exports.autoswarm],
        SHAPE: 0,
        BODY: {
            PENETRATION: 1,
            SPEED: 3.75,
            RANGE: 90,
            DENSITY: 1.25,
            HEALTH: 0.33 * wepHealthFactor,
            DAMAGE: 4 * wepDamageFactor,
            PUSHABILITY: 0.3,
        },
        CAN_GO_OUTSIDE_ROOM: true,
    };
exports.accelbullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'accel',
}
exports.growbullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'grow',
};
exports.trap = {
    LABEL: 'Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Block',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.invissunchip = {
        PARENT: [exports.sunchip],
        INVISIBLE: [0.08, 0.03],
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.twistmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,      90,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,     0,     270,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.architectgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            SKIN: 0,                    // def
        }, }, 
    ],
};

        exports.oldbetatester = {
            PARENT: [exports.genericTank],
            LABEL: 'Custom',
            INVISIBLE: [],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
exports.betatester = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tester',
            INVISIBLE: [],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
exports.betatester2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Custom 2',
            INVISIBLE: [],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
          SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
          INVISIBLE: [],
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 2,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };

exports.testbed2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Misc',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };

exports.testbed3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Bosses',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };

exports.testbed4 = {
            PARENT: [exports.genericTank],
            LABEL: 'Polygons',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };

exports.testbed5 = {
            PARENT: [exports.genericTank],
            LABEL: 'Custom (Dev)', 
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
exports.testbed6 = {
            PARENT: [exports.genericTank],
            LABEL: 'Green Varients',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };

exports.testbed7 = {
            PARENT: [exports.genericTank],
            LABEL: 'Ammo',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
exports.testbed8 = {
            PARENT: [exports.genericTank],
            LABEL: 'Ammo 2',
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };

exports.testbed9 = {
            PARENT: [exports.genericTank],
            LABEL: 'Custom Bosses',
            CUSTOM: true,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                }, 
            ],
        };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };


exports.landmine = {
    PARENT: [exports.genericTank],
    LABEL: 'Landmine',
    INVISIBLE: [0.06, 0.01],
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0, ],
        TYPE: exports.smasherBody,
    }, {
        POSITION: [21.5, 0, 0, 90, 360, 0, ],
        TYPE: exports.smasherBody,
    }],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
};
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  14,    20,      1,      0,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  18,    6.5,    1,      0,      4,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    6.5,    1,      0,      -4,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin);

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
exports.turreteddrone = makeAuto(exports.drone);
exports.drivesymbol = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4
};
exports.drive = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.drivesymbol,
    }],
    MAX_CHILDREN: 8,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },

    }, ],
};
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Auto-seer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
        exports.maleficitor = {
            PARENT: [exports.genericTank],
            LABEL: 'Maleficitor',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.invissunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.autolilfact = makeAuto(exports.lilfact);
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "Crop Duster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };

            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     20,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.architect = {
                PARENT: [exports.genericTank],
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.architectgun,
                            },
                ],
            };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.twister = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    10.5,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,     0.75,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twist]),
                            TYPE: exports.twistmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.hurricane = {
    PARENT: [exports.genericTank],
    LABEL: 'Cyclone',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, ],
};
            exports.septatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Septa-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

            exports.tritrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Tri-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, },
                ],
            };
            exports.trapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Trapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };
        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.eagle = {
                PARENT: [exports.genericTank],
                LABEL: 'Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                LABEL: 'Pounder',
                ALT_FIRE: true,
            }, },{   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
    exports.bulwark = {
        PARENT: [exports.genericTank],
        LABEL: 'Bulwark',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
                POSITION: [  10,     8,      1,      0,      5.5,     190,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      5.5,     190,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  10,     8,      1,      0,      -5.5,     170,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      -5.5,     170,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
        ],
    };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Bushwhacker',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.stalker = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Stalker',
    INVISIBLE: [0.08, 0.03],
    BODY: {
        ACCELERATION: base.ACCEL * 0.55,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.35,
    },
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }],
};
exports.manager = {
    PARENT: [exports.genericTank],
    LABEL: 'Manager',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    INVISIBLE: [0.06, 0.01],
    MAX_CHILDREN: 5,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE,
        HEALTH: base.HEALTH * 0.3,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: "miniboss",
    DANGER: 6,
    SKILL: skillSet({
        rld: .7,
        dam: .5,
        pen: .8,
        str: .8,
        spd: .2,
        atk: .3,
        hlt: 1,
        shi: .7,
        rgn: .7,
        mob: 0
    }),
    LEVEL: 45,
    CONTROLLERS: ["nearestDifferentMaster", "minion", "canRepel"],
    AI: {
        NO_LEAD: true
    },
    FACING_TYPE: "autospin",
    HITS_OWN_TYPE: "hardOnlyBosses",
    BROADCAST_MESSAGE: "A visitor has left!"
};
exports.crasherSpawner = {
    PARENT: [exports.genericTank],
    LABEL: "Spawned",
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: 5,
    INDEPENDENT: true,
    AI: {
        chase: true
    },
    MAX_CHILDREN: 4,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
            TYPE: [exports.drone, {
                LABEL: "Crasher",
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.drone
        }
    }]
};
exports.elite = {
    PARENT: [exports.miniboss],
    LABEL: "Elite Crasher",
    COLOR: 5,
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    }
};
exports.elite_destroyer = {
    PARENT: [exports.elite],
    GUNS: [{
        POSITION: [5, 16, 1, 6, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }, {
        POSITION: [5, 16, 1, 6, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }, {
        POSITION: [5, 16, 1, 6, 0, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }],
    TURRETS: [{
        POSITION: [11, 0, 0, 180, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 60, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, -60, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: [exports.bigauto4gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }]
};
exports.elite_gunner = {
    PARENT: [exports.elite],
    GUNS: [{
        POSITION: [14, 16, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.pillbox, {
                INDEPENDENT: true
            }]
        }
    }, {
        POSITION: [6, 14, -2, 2, 0, 60, 0]
    }, {
        POSITION: [6, 14, -2, 2, 0, 300, 0]
    }],
    AI: {
        NO_LEAD: false
    },
    TURRETS: [{
        POSITION: [14, 8, 0, 60, 180, 0],
        TYPE: [exports.auto4gun]
    }, {
        POSITION: [14, 8, 0, 300, 180, 0],
        TYPE: [exports.auto4gun]
    }]
};
exports.elite_sprayer = {
    PARENT: [exports.elite],
    AI: {
        NO_LEAD: false
    },
    TURRETS: [{
        POSITION: [14, 6, 0, 180, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5
        }]
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5
        }]
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5
        }]
    }]
};
exports.elite_battleship = {
    PARENT: [exports.elite],
    GUNS: [{
        POSITION: [4, 6, .6, 7, -8, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, 60, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, -8, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, 180, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, -8, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, -60, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }],
    TURRETS: [{
        POSITION: [5, 7, 0, 0, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }, {
        POSITION: [5, 7, 0, 120, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }, {
        POSITION: [5, 7, 0, 240, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }]
};
exports.palisade = (() => {
    let T = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true
    };
    return {
        PARENT: [exports.miniboss],
        LABEL: "Rogue Palisade",
        COLOR: 17,
        SHAPE: 6,
        SIZE: 30,
        VALUE: 5e5,
        BODY: {
            FOV: 1.4,
            SPEED: .05 * base.SPEED,
            HEALTH: 16 * base.HEALTH,
            SHIELD: 3 * base.SHIELD,
            DAMAGE: 3 * base.DAMAGE
        },
        GUNS: [{
            POSITION: [4, 6, -1.6, 8, 0, 0, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 60, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 120, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true
            }
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 240, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 300, 0],
            PROPERTIES: T
        }],
        TURRETS: [{
            POSITION: [5, 10, 0, 30, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 90, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 150, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 210, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 270, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 330, 110, 0],
            TYPE: exports.trapTurret
        }]
    }
})(), exports.skimboss = {
    PARENT: [exports.elite],
    LABEL: "Elite Skimmer",
    COLOR: 2,
    TURRETS: [{
        POSITION: [15, 5, 0, 60, 170, 0],
        TYPE: exports.skimturret
    }, {
        POSITION: [15, 5, 0, 180, 170, 0],
        TYPE: exports.skimturret
    }, {
        POSITION: [15, 5, 0, 300, 170, 0],
        TYPE: exports.skimturret
    }]
};
exports.summoner = {
    PARENT: [exports.miniboss],
    LABEL: "Summoner",
    DANGER: 8,
    SHAPE: 4,
    COLOR: 13,
    SIZE: 26,
    MAX_CHILDREN: 28,
    FACING_TYPE: "autospin",
    VALUE: 3e5,
    BODY: {
        FOV: .5,
        SPEED: .1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.6 * base.DAMAGE
    },
    GUNS: [{
        POSITION: [3.5, 8.65, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 270, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 180, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }]
};
exports.nestKeeperTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Boomer Turret',
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        SPEED: base.SPEED * .8,
        FOV: base.FOV * 1.15
    },
    GUNS: [{
        POSITION: [18, 10, 1, 0, 0, 0, 0]
    }, {
        POSITION: [6, 10, -1.5, 7, 0, 0, 0]
    }, {
        POSITION: [2, 10, 1.3, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.one_third_reload, g.more_speed]),
            TYPE: exports.boomerang
        }
    }]
};
exports.nestKeeper = {
    PARENT: [exports.miniboss],
    LABEL: 'Nest Keeper',
    COLOR: 14,
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * .25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5
    },
    MAX_CHILDREN: 15,
    GUNS: [{
        POSITION: [3.5, 6.65, 1.2, 8, 0, 35, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher',
        },
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, -35, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, 108, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, -108, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }],
    TURRETS: [{
        POSITION: [8, 9, 0, 72, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 0, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 144, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 216, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, -72, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.nestKeeperTurret, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }]
};

// exports.bot = {
//     AUTO_UPGRADE: 'random',
//     FACING_TYPE: 'looseToTarget',
//     BODY: {
//         SIZE: 12,
//         HEALTH: base.HEALTH * 0.75,
//         DAMAGE: base.DAMAGE * 0.75,
//     },
//     //COLOR: 17,
//     NAME: "[AI] ",
//     CONTROLLERS: [
//         'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
//     ],
//     AI: { STRAFE: true, },
//     SKILL: skillSet({
//         rld: 0.875,
//         spd: 0.875,
//         dam: 0.875, 
//         pen: 0.875,
//         str: 0.875,
//         atk: 0.875,
//     }),
// };

exports.octoblock = {
    PARENT: [exports.block],
    SHAPE: -8,
                LABEL: 'Octo Block',
                CUSTOM: true,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     4,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet, 
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [  18,     4,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, },
                ],
            };

exports.supertest = {
    PARENT: [exports.genericTank],
    LABEL: 'Octolauncher',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      0.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,  g.halfsize,  g.octoblock]),
            TYPE: exports.octoblock,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     18,      0.8,      0,      0,      0,      0,   ], 
        },
    ],
};

exports.weenus = {
    PARENT: [exports.genericTank],
    LABEL: 'Weiner',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  99999,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.weiner]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};


exports.ball = {
    PARENT: [exports.genericTank],
    LABEL: 'BIG BALL',
    CUSTOM: true,
    NAME: 'BIG BALL',
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //INVISIBLE: [0.08, 0.03],
    SIZE: 40,
    BODY: {
        ACCELERATION: 10,
        SPEED: 10,
        HEALTH: 10000000,
        RESIST: 10,
        SHIELD: 1000000,
        REGEN: 100000000,
        DAMAGE: 0,
        PENETRATION: 0.001,
        RANGE: 0,
        FOV: 2,
        DENSITY: 100,
        STEALTH: 1,
        PUSHABILITY: 10,        
        HETERO: 2,
  },
};

exports.saw = {
    PARENT: [exports.trap],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Sawblade',
    CUSTOM: true,
    SHAPE: -16,
    DIPMULTI: 0.3,
    DANGER: 7,
    MOTION_TYPE: 'motor', 
    FACING_TYPE: 'toTarget',
    CONTROLLERS: ['fastspin'], 
    BODY: {
        DAMAGE: 1.5 * 1,
        DENSITY: 8,
        HEALTH: 10 * 2,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};

exports.indust = {
    PARENT: [exports.genericTank],
    LABEL: 'Industrialist',
    CUSTOM: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.halfreload, g.morespeed, g.morespeed]),
            TYPE: exports.saw,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, },
    ],
};

exports.bender5 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 5,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     45, 0, ],
TYPE: [exports.testbed, {COLOR:5,}],
COLOR: 5
}],
};
exports.bender4 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender5,
}],
};
exports.bender3 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender4,
}],
};
exports.bender2 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender3,
}],
};
exports.bender1 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender2,
}],
};

exports.leftball = {
PARENT: [exports.genericTank],
LABEL: 'Left Nut',
CUSTOM: true,
COLOR: 13,
SHAPE: 0,
};
exports.rightball = {
PARENT: [exports.genericTank],
LABEL: 'Right Nut',
CUSTOM: true,
COLOR: 13,
SHAPE: 0,
};

exports.bender = {
PARENT: [exports.genericTank],
LABEL: 'Time to take a piss',
CUSTOM: true,
COLOR: 13,
FACING_TYPE: 'locksFacing',
SHAPE:  0,
BODY: {
    SHIELD: 999999,
    REGEN: 999999,
},
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender1,
},{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [25,     0,      10,      0,     0, 1, ],
TYPE: exports.leftball,
},{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [25,     0,     -10,      0,     0, 1, ],
TYPE: exports.rightball,
},
],};

exports.invissymbol = {
    PARENT: [exports.genericTank],
    CUSTOM: true,
    LABEL: '',
    SHAPE: 0
};

exports.invisblock = {
        PARENT: [exports.block],
        CUSTOM: true,
        INVISIBLE: [0.08, 0.03],
                  TURRETS: [{
            POSITION: [10, 0, 0, 0, 360, 1, ],
            TYPE: exports.invissymbol,
            }],
    };

exports.miner = {
                PARENT: [exports.genericTank],
                LABEL: 'Miner',
                CUSTOM: true,
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                GUNS: [  {
                    POSITION: [  15,     7,      1,      0,      3.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.invisblock,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      -3.5,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.invisblock,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [        3,     14,     1.1,    15,      0,      0,      0,   ],
                        },
                  ],
};

exports.imposter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 1.2,
            },
              TURRETS: [{
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 0, 0, 0, 360, 1, ],
            TYPE: exports.invissymbol,
            }],
            INVISIBLE: [0.06, 0.01],
            LABEL: 'Imposter',
            CUSTOM: true,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };

exports.nap = {
                PARENT: [exports.genericTank],
                LABEL: 'Kidnapper',
                CUSTOM: true,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  15,    20,      1,      0,      0,      0,     0.45,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                       
                ],
            };

exports.furnace = {
        PARENT: [exports.genericTank],
        LABEL: 'Furnace',
        CUSTOM: true,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     4,     1.4,     8,      0,      0,      0,   ],  
            },  {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10,     15,     0.6,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed]),
                TYPE: exports.flare,
            }, }, 
        ],
    };

exports.traptrapper = {
    LABEL: 'Trap Trapper',
    CUSTOM: true,
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: 3, 
    NECRO: true,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 0.8 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        RANGE: 150,
        DENSITY: 1.5,
        RESIST: 1.5,
        SPEED: 0,
    },
          GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      60,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, }, {   
            POSITION: [  15,     8,      1,      0,      0,     180,     0.1,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, }, {   
            POSITION: [  15,     8,      1,      0,      0,     300,     0.2,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, },
        ],
};
            exports.dumptruck = {
                PARENT: [exports.genericTank],
                LABEL: 'Dumptruck',
                CUSTOM: true,
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     17,      1.3,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     19,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.doublereload, g.morespeed]),
                            TYPE: exports.traptrapper, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  2,     25,      1,      14,      0,      0,      0,   ],
                        }, 
                  ],
            };

exports.omega = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Ω',
                CUSTOM: true,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     20,     2,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni,g.pound, g.destroy, g.anni,g.omega]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };

exports.explosivetrap = {
    LABEL: 'Trap',
    CUSTOM: true,
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'hardWithBuffer',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 10,
        RESIST: 1,
        SPEED: 0,
        PUSHABILITY: 30,
    },
};

exports.exploder = {
    PARENT: [exports.genericTank],
    LABEL: 'Exploder',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      0.5,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1.5,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     0.7,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     0.7,      0,    -7.25,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, },
    ],
};

exports.torpedo = {
    //faster torpedo = more damage
    LABEL: 'Torpedo',
    CUSTOM: true,
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 5,
        SPEED: 0,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
        GUNS: [ { 
                  //LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [  20,     10,      1.5,       0,      0,      180,      0,   ], 
        PROPERTIES: {
        SHOOT_SETTINGS: combineStats([    
        //RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  
        [3,      3,     1,      1,      1,      1,      1,      1,      1,      0.1,      1,      1,      1],
        ]),
      TYPE: exports.bullet, 
          AUTOFIRE: true,
    },
  }, 
],
};

exports.balli = {
    PARENT: [exports.genericTank],
    FACING_TYPE: 'locksFacing',
    LABEL: 'Ballistic',
    CUSTOM: true,
              BODY: {
                FOV: base.FOV * 1.15,
            },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      0.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morerange, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morehealth]),
            TYPE: exports.torpedo,
            MAX_CHILDREN: 1,      
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     8,      1.5,      0,      0,      0,      0,   ], }, 
    ],
};

exports.dogeTest = {
    PARENT: [exports.genericTank],
    LABEL: 'DogeisCut',
    CUSTOM: true,
    DANGER: 99999,
    SHAPE: 2000,
    VALUE: 999999999999999999,
    HAS_NO_RECOIL: true,
    COLOR: "#eb9d50",
    SKILL: skillSet({ 
    hlt: 100000,
    dam: 100000,
    spd: 100000,
    }),
    SIZE: 24,
    BODY: {
        FOV: 3,
        HEALTH: 999999999999999999,
        DAMAGE: 999999999,
        SPEED: 40
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      2,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Cleaner',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
           
           
           
           { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*2,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*3,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*4,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*5,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*6,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*7,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*8,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*9,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*10,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*11,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, 
    ],
};
exports.waffzTest = {
    PARENT: [exports.genericTank],
    LABEL: 'Waffz_The_Pancake',
    CUSTOM: true,
    DANGER: 99999,
    SHAPE: 2001,
    HAS_NO_RECOIL: true,
    COLOR: 36,
    SKILL: skillSet({ 
    hlt: 100000,
    dam: 100000,
    spd: 100000,
    }),
    SIZE: 24,
    BODY: {
        FOV: 3,
        HEALTH: 999999999,
        DAMAGE: 999999999,
        SPEED: 40
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      2,      9999,      9999,      9999,      100,      2,      1,      9999,      0.00001,      0]]),
            TYPE: exports.bullet,
            LABEL: 'Cleaner',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.bubbleSpike = {
  SHAPE:0,
    CUSTOM: true,
      GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.morespeed]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.bubble = {
    LABEL: 'Bubble',
    CUSTOM: true,
    SHAPE: -6,
    DIPMULTI: 2,
    TYPE: 'bullet',
    FACING_TYPE: 'autospin',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 8,
        SPEED: 0,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 1 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    TURRETS: [{/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      0,     180, 0], 
    TYPE: exports.bubbleSpike,
    },        {/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      120,     180, 0], 
    TYPE: exports.bubbleSpike,
    },        {/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      240,     180, 0], 
    TYPE: exports.bubbleSpike,
    },
    ],
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    TYPE: exports.trap
};

exports.gen = {
    PARENT: [exports.genericTank],
    LABEL: 'Generator',
    CUSTOM: true,
    MAX_CHILDREN: 3,
              BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1.4,      0,      0,      15,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morespeed, g.morerange, g.moredamge]),
            TYPE: exports.bubble,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1.4,      0,      0,      -15,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morespeed, g.morerange, g.moredamge]),
            TYPE: exports.bubble,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  21,     14,      1,      0,      0,      0,      0.5,   ],  }, 
    ],
};

exports.arenaCloser = {
    PARENT: [exports.genericTank],
    LABEL: 'Arena Closer',
    DANGER: 10,
    SIZE: 34,
    COLOR: 3, //13,
    LAYER: 13,
  
    // AI: {
    //             FULL_VIEW: true,
    //             SKYNET: true,
    //             BLIND: true,
    //             LIKES_SHAPES: true
    //     },
    // CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    // SKILL: Array(10).fill(9),
    // ACCEPTS_SCORE: false,
    // CAN_BE_ON_LEADERBOARD: false,
    // VALUE: 100000,
    // NAME: 'Arena Closer',
  
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 1.15,
        SPEED: 8
    },
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: 'never',
    GUNS: [{
        POSITION: [14, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
            TYPE: [exports.bullet, {
                LAYER: 12
            }]
        }
    }]
};

exports.scturret = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CUSTOM: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.auto]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.auto]),
                TYPE: exports.bullet,
            }, }, 
        ],
};

exports.scattergun = {
        PARENT: [exports.genericTank],
        LABEL: 'Scattergun',
        CUSTOM: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin,]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin,]),
                TYPE: exports.bullet,
            }, }, 
        ],
                TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.scturret,
    }],
};

exports.lance = {
    PARENT: [exports.bullet],
    LABEL: '',
    SIZE: 18/2,
    //DRAW_SELF: false,
};

exports.lancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Lancer',
    CUSTOM: true,
    STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 1.1,
        FOV: base.FOV * 1.1,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     0,   1,      8,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lancereal]),
            TYPE: exports.lance,
            LABEL: 'Lance',
            AUTOFIRE: true,
        }, }, 
           { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     12,   0.00001,      8,      0,      0,      0,   ], 
        }, 
    ],
};

exports.extremeaccelbullet = {
  PARENT: [exports.bullet],
  CUSTOM: true,
  MOTION_TYPE: 'extremeaccel',
  LABEL: 'Bolt',
  SHAPE: -3,
  //DIPMULTI: 0.0000001,
  DIPMULTI: -2,
}

exports.archer = {
    PARENT: [exports.genericTank],
    LABEL: 'Archer',
    CUSTOM: true,
    BODY: {
      FOV: base.FOV * 1.3,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8*2,      0.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pound,g.destroy,g.lessreload,g.archer,g.halfreload,g.lessreload,g.halfsize]),
            TYPE: exports.extremeaccelbullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     15/2,      2,      12,      0,      0,      0,   ], 
        }, 
    ],
};

exports.dominationBody = {
    LABEL: "",
    CONTROLLERS: ["dontTurnDominator"],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
};

//should define a base centre and use it for all of them instead of using the level 1
exports.centre = {
            TYPE: "miniboss",
            DANGER: 6,
            PARENT: [exports.genericTank],
            BROADCAST_MESSAGE: 'The Centre has been slain!',
            LABEL: 'Centre',
            CUSTOM: true,
            SIZE: 48,
            CAN_BE_ON_LEADERBOARD: true,
            COLOR: '#FF0000',
            SHAPE:3,
            VALUE: 2000,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: true,
            HEALTH_WITH_LEVEL: false,
            TYPE: "something",
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 2000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
            //             }, {
            //     POSITION: [  12,     0,      0,      45,     360,  3], 
            //         TYPE: exports.centreturret,
            //             },
            // ],
        };

exports.noRecoilAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    CUSTOM: true,
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.norecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};

exports.centre2 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 2) has been slain!',
            LABEL: 'Centre Level 2',
            CUSTOM: true,
            VALUE: 4000,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 2500, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
        };
exports.centre2 = makeAuto(exports.centre2, "Centre Level 2", { type: exports.noRecoilAutoTurret, size:11, });

exports.centre3 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 3) has been slain!',
            LABEL: 'Centre Level 3',
            CUSTOM: true,
            VALUE: 6000,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 3000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            }, GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
                },
            ],
           
      };
exports.centre3 = makeAuto(exports.centre3, "Centre Level 3", { type: exports.centre, size:11, } );

exports.centre4 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 4) has been slain!',
            LABEL: 'Centre Level 4',
            CUSTOM: true,
            VALUE: 8000,
            SHAPE: 6,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 3500, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 0,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, }, {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      120,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      240,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
           
      };
exports.centre4 = makeAuto(exports.centre4, "Centre Level 4", { type: exports.centre, size:11, } );

exports.centre5 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 5) has been slain! (Impressive!)\nThe Centre has been reset to level 1!',
            LABEL: 'Centre Level 5',
            CUSTOM: true,
            VALUE: 100000,
            SHAPE: 6,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 4000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 0,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                           TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },  {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      120,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      240,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
           
      };
exports.centre5 = makeAuto(exports.centre5, "Centre Level 5", { type: exports.centre2, size:11, } );

exports.mazeWall = {
    PARENT: [exports.obstacle],
    SIZE: 25,
    SHAPE: 4,
    LABEL: "Wall"
};

 exports.mazeWallShooter = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Maze Wall Shooter',
                CUSTOM: true,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.mazeWall,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };

exports.mothership = {
    PARENT: [exports.genericTank],
    LABEL: "Mothership",
    DANGER: 10,
    SIZE: exports.genericTank.SIZE * (7 / 3),
    SHAPE: 16,
    STAT_NAMES: statnames.drone,
    VALUE: 5e5,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    BODY: {
        REGEN: 0,
        FOV: 1,
        SHIELD: 0,
        ACCEL: .2,
        SPEED: .3,
        HEALTH: 2000,
        PUSHABILITY: .15,
        DENSITY: .2,
        DAMAGE: 1.5
    },
    HITS_OWN_TYPE: "pushOnlyTeam",
    GUNS: (() => {
        let e = [],
            T = [1];
        for (let e = 1; e < 8.5; e += .5) {
            let t = e / 16;
            T.push(t);
        }
        for (let t = 0; t < 16; t++) {
            let S = 22.5 * (t + 1),
                E = {
                    MAX_CHILDREN: 2,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true
                };
            t % 2 == 0 && (E.TYPE = [exports.drone, {
                AI: {
                    skynet: true
                },
                INDEPENDENT: true,
                LAYER: 10,
                BODY: {
                    FOV: 2
                }
            }]);
            let O = {
                POSITION: [4.3, 3.1, 1.2, 8, 0, S, T[t]],
                PROPERTIES: E
            };
            e.push(O);
        }
        return e;
    })()
};

exports.dominator = {
    PARENT: [exports.genericTank],
    LABEL: "Dominator",
    DANGER: 10,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1
    }),
    LEVEL: -1,
    BODY: {
        RESIST: 100,
        SPEED: 1.32,
        ACCELERATION: .8,
        HEALTH: 590,
        DAMAGE: 6,
        PENETRATION: .25,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.4
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    DISPLAY_NAME: true,
    TURRETS: [{
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }],
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    HITS_OWN_TYPE: "pushOnlyTeam"
};
exports.destroyerDominator = {
    PARENT: [exports.dominator],
    GUNS: [{
        POSITION: [15.25, 6.75, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroyerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 6.75, -1.6, 6.75, 0, 0, 0]
    }]
};
exports.gunnerDominator = {
    PARENT: [exports.dominator],
    GUNS: [{
        POSITION: [14.25, 3, 1, 0, -2, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [14.25, 3, 1, 0, 2, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [15.85, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0]
    }]
};
exports.trapperDominator = {
    PARENT: [exports.dominator],
    FACING_TYPE: 'autospin',
    CONTROLLERS: ['alwaysFire'],
    GUNS: [{
        POSITION: [4, 3.75, 1, 8, 0, 0, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 45, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 90, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 135, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 180, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 225, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 270, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 315, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }]
};

exports.bot = {
    AUTO_UPGRADE: "random",
    FACING_TYPE: "looseToTarget",
    //COLOR: 12,
    BODY: {
        SIZE: 10
    },
    NAME: "[AI] ",
    CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "minion", "fleeAtLowHealth", "wander"],
    AI: {
        STRAFE: true
    }
};
exports.ramBot = {
    AUTO_UPGRADE: "random",
    FACING_TYPE: "looseToTarget",
    //COLOR: 12,
    BODY: {
        SIZE: 10
    },
    NAME: "[AI] ",
    MOTION_TYPE: 'chase',
    CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "fleeAtLowHealth", "mapTargetToGoal", "wander"],
    AI: {
        STRAFE: false
    }
};
exports.tagMode = {
    PARENT: [exports.bullet],
    LABEL: "Players"
};

// exports.basic = {
//     PARENT: [exports.genericTank],
//     LABEL: 'Basic',
//     //CONTROLLERS: ['nearestDifferentMaster'],
//     GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
//         POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
//         PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic]),
//             TYPE: exports.bullet,
//             LABEL: '',                  // def
//             STAT_CALCULATOR: 0,         // def
//             WAIT_TO_CYCLE: false,       // def
//             AUTOFIRE: false,            // def
//             SYNCS_SKILLS: false,        // def         
//             MAX_CHILDREN: 0,            // def  
//             ALT_FIRE: false,            // def 
//             NEGATIVE_RECOIL: false,     // def
//         }, }, 
//     ],
// };

exports.teaser = {
    PARENT: [exports.genericTank],
    LABEL: 'Teaser',
    CUSTOM: true,
  FACING_TYPE: 'locksFacing',
   BODY: {
        FOV: 1.12,
    },    
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,     10,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.anni,g.destroy,g.pound,g.swarm,g.battle,g.carrier,g.whatthe,g.doublereload,g.doublereload,g.health4damage]),
            TYPE: exports.swarm,
            LABEL: 'Front Swarmer',      
            STAT_CALCULATOR: gunCalcNames.swarm, 
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  11,     14,      1,      0,      0,      90,      0,   ], 
           }, 
    ],
};

exports.star = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6
    },
    LABEL: "Super Star",
    CUSTOM: true,
    VALUE: 40000,
    SHAPE: -5,
    DIPMULTI: 0.2,
    SIZE: 7,
    COLOR: 3,
    BODY: {
        DAMAGE: -99999999999999999999,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

exports.donutBullet = {
    LABEL: 'Donut Bullet',
    CUSTOM: true,
    TYPE: 'bullet',
    SHAPE: 1000,
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.donut = {
    PARENT: [exports.genericTank],
    LABEL: 'Donut Basic',
    CUSTOM: true,
    SHAPE: 1000,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,     8,      1,      8,      0,      0,      0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.donutBullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.redDot = {
            LABEL: '',
            CUSTOM: true,
            SHAPE:0,
            SIZE:11,
            COLOR:12,
            INDEPENDENT: true,
};



exports.explosive = {
    LABEL: 'Explosive',
    CUSTOM: true,
    TYPE: 'bullet',
    MOTION_TYPE: 'explode',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    //TURRETS: [{ POSITION: [  5,     0,      0,      0,     360,  1], TYPE: exports.redDot,},],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.demoman = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Demolitionist',
            CUSTOM: true,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     15,      0,      0,     360,  1], 
                    TYPE: exports.redDot,
                        },
            ],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.doublerecoil, g.morespeed]),
                    TYPE: exports.explosive,
                }, },
            ],
        };

exports.carrot = {
    LABEL: 'Carrot',
    CUSTOM: true,
    SHAPE: 2003,
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.farmer = {
    PARENT: [exports.genericTank],
    LABEL: 'Farmer Basic',
    CUSTOM: true,
    SHAPE: 2002,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.carrot,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.explosivesmall = {
    LABEL: 'Small Explosive',
    CUSTOM: true,
    TYPE: 'bullet',
    MOTION_TYPE: 'explodesmall',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    //TURRETS: [{ POSITION: [  5,     0,      0,      0,     360,  1], TYPE: exports.redDot,},],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.poprocks = {
            PARENT: [exports.genericTank],
            LABEL: 'Poprocks',
            CUSTOM: true,
            DANGER: 6,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  1.5,    9.5,   7.25,    0,     360,  1], 
                TYPE: exports.redDot,
              },{       /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  1.5,    9.5,  -7.25,    0,     360,  1], 
                TYPE: exports.redDot,
              },{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  2.5,    13.5,   3.75,    0,     360,  1], 
                TYPE: exports.redDot,
              },{       /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  2.5,    13.5,  -3.75,    0,     360,  1], 
                TYPE: exports.redDot,
              },
            ],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.explosivesmall,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.explosivesmall,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.explosivesmall,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.explosivesmall,
                    }, }, 
            ],
        };

exports.explosiveDrone = {
    LABEL: 'Explosive Drone',
    CUSTOM: true,
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: -3,
    DIPMULTI: 5,
    MOTION_TYPE: 'explodesmall',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 90,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};

exports.reskins = {
    PARENT: [exports.genericTank],
    LABEL: 'Sharp Basic',
    CUSTOM: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, }, 
        {POSITION: [  13,     8,      0.01,      0,      0,      25,      0,   ], },
        {POSITION: [  13,     8,      0.01,      0,      0,      -25,      0,   ], },
    ],
};

exports.tankMinion = {
    PARENT: [exports.basic],
    LABEL: 'Tank Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED/3,
        HEALTH: base.HEALTH/4, 
        DAMAGE: base.DAMAGE/2, 
        PENETRATION: base.PENETRATION/2, 
        SHIELD: base.SHIELD/2,
        REGEN: base.REGEN/2,
        FOV: base.FOV/2,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.halfnerf,g.clonerbuff]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};

exports.cloner = {
                PARENT: [exports.genericTank],
                LABEL: 'Cloner',
                CUSTOM: true,
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 3,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,     20-3,      1,      6.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     20,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.blank,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload]),
                            TYPE: exports.tankMinion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   10,     20,      1,      2,      0,      0,      0,   ], 
                    }
                ],
            };

  exports.aitank = {
    PARENT: [exports.genericTank],
    LABEL: 'AI generated tank',
    DANGER: 7,
    CUSTOM: true,
    BODY: {
      ACCELERATION: base.ACCEL * 0.8,
      SPEED: base.SPEED * 0.8,
      HEALTH: base.HEALTH * 1.5,
      DAMAGE: base.DAMAGE * 1.5,
      PENETRATION: base.PENETRATION * 1.5,
      SHIELD: base.SHIELD * 1.5,
      REGEN: base.REGEN * 1.5,
      FOV: base.FOV * 1.5,
      DENSITY: base.DENSITY * 1.5,
      PUSHABILITY: 0.9,
      HETERO: 3,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  17,     9,      1,      0,      0,      0,      0,   ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload,g.halfreload]),
        TYPE: exports.bullet,
      }, }, {
      POSITION: [  13,     8,      0.01,      0,      0,      25,      0,   ], },
      {POSITION: [  13,     8,      0.01,      0,      0,      -25,      0,   ], },
    ],
  };

exports.tank = {
   PARENT: [exports.genericTank],
   LABEL: 'TESTDEBUG',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 50, 5, 1, 0, 5, 0, 0, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
      }, }, {
         POSITION: [ 50, 5, 1, 0, -5, 0, 0.2, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
      }, }, {
         POSITION: [ 50, 5, 1, 0, -3, 0, 0.4, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
      }, }, {
         POSITION: [ 50, 5, 1, 0, 3, 0, 0.6, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
      }, }, {
         POSITION: [ 50, 5, 1, 0, 0, 0, 0.8, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
      }, }, {
         POSITION: [ 15, 15, 1.5, 0, 0, 0, 0, ],
      }, {
         POSITION: [ 15, 15, 0.0001, 0, 0, -135, 0, ],
      }, {
         POSITION: [ 15, 15, 0.0001, 0, 0, 135, 0, ],
      }, {
         POSITION: [ 15, 15, 0.0001, 0, 0, 180, 0, ],
      }, 
   ],
};


exports.stupidTank = {
   PARENT: [exports.genericTank],
   LABEL: 'Stupid Tank',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, 45, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, 90, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, 135, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, -180, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, -135, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, -90, 0, ],
      }, {
         POSITION: [ 18, 8, 1, 0, 0, -45, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, -22.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, -67.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, -112.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, -157.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, 157.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, 112.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, 67.5, 0, ],
      }, {
         POSITION: [ 21, 5, 1, 0, 0, 22.5, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, 0, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, -45, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, -90, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, -135, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, 180, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, 135, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, 90, 0, ],
      }, {
         POSITION: [ 3, 11, 0.1, 24, 0, 45, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, 22.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, -22.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, -67.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, -112.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, -157.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, 157.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, 112.5, 0, ],
      }, {
         POSITION: [ 5, 11, -0.0001, 32, 0, 67.5, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 0, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -30, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -60, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -90, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -120, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -150, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, -180, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 150, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 120, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 90, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 60, 0, ],
      }, {
         POSITION: [ 6, 11, 2, 40, 0, 30, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -15, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -45, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -75, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -105, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -135, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, -165, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 165, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 135, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 105, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 75, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 45, 0, ],
      }, {
         POSITION: [ 6, 22, 0.5, 50, 0, 15, 0, ],
      }, 
   ],
};


exports.BALLSBALLSBALLS = {
   PARENT: [exports.genericTank],
   LABEL: 'Tank',
   GUNS: [ {
         POSITION: [ 18, 8, 1, 11, -13, 15, 0, ],
         }, {
         POSITION: [ 18, 8, 1, 11, -13, 0, 0, ],
         }, {
         POSITION: [ 18, 8, 1, 0, 0, 90, 0, ],
         }, 
     ],
};


exports.radar = {
   PARENT: [exports.genericTank],
   LABEL: 'Radar',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, -54.73698827040275, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.flank]),
            TYPE: exports.block,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 54.73698827040275, 0.2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.flank]),
            TYPE: exports.block,
         }, }, {
         POSITION: [ 2, 8, 1.5, 17, 0, -53.74616226255521, 0, ],
         }, {
         POSITION: [ 2, 8, 1.5, 17, 0, 53.74616226255521, 0, ],
         }, {
         POSITION: [ 13, 7, 1, 7, 0, 0, 0.9, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
         }, }, 
     ],
};


exports.hiveSpammer = {
   PARENT: [exports.genericTank],
   LABEL: 'Hive Spammer',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, -24, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 24, 0.0625, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -63, 0.125, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 63, 0.1875, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -103.5, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 103.5, 0.3125, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -148.5, 0.375, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 148.5, 0.4375, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 179.5, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -179.5, 0.5625, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0.5, 0.625, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -0.5, 0.6875, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -89.5, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 89.5, 0.8125, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hive,
            LABEL: 'Hive Spammer',
         }, }, 
     ],
};

exports.theOneshot = {
   PARENT: [exports.genericTank],
   LABEL: 'The Oneshot',
   SHAPE: 6,
   COLOR: 4,
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.casing,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.flare,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.swarm,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bee,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.autoswarm,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.accelbullet,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.growbullet,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.trap,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.block,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.boomerang,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.drone,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.sunchip,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.autosunchip,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.invissunchip,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gunchip,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.missile,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.twistmissile,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.hypermissile,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.snake,
            ALT_FIRE: true,
         }, }, {
         POSITION: [ 9, 6, 0.0001, 7, 0, -22.5, 0, ],
         }, {
         POSITION: [ 9, 6, 0.0001, 7, 0, 22.5, 0, ],
         }, {
         POSITION: [ 5, 6, 0.0001, 7, 0, -45, 0, ],
         }, {
         POSITION: [ 5, 6, 0.0001, 7, 0, 45, 0, ],
         }, {
         POSITION: [ 10, 6, 0.0001, 7, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 6, 0.0001, 7, 0, 0, 0, ],
         }, 
     ],
};

exports.overmancer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overmancer',
            DANGER: 6,
            CUSTOM: true,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE:6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     10,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                        MAX_CHILDREN: 7,
                    }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     -120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, },
                ],
}

exports.cumchip = {
    PARENT: [exports.sunchip],
  CUSTOM: true,
    SHAPE: 0,
};
exports.bumchip = {
    PARENT: [exports.sunchip],
  CUSTOM: true,
    SHAPE: 3,
};
exports.dumbchip = {
    PARENT: [exports.sunchip],
  CUSTOM: true,
    SHAPE: 5,
};

exports.collector = {
                PARENT: [exports.genericTank],
                LABEL: 'Collector',
                DANGER: 7,
                CUSTOM: true,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    0.8,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.cumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    0.8,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    0.8,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.bumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    0.8,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.dumbchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };

exports.autocumchip = {
    PARENT: [exports.autosunchip],
    SHAPE: 0,
};

exports.eggmacer = {
                PARENT: [exports.genericTank],
                LABEL: 'Eggmancer',
                DANGER: 7,
                CUSTOM: true,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 1000,
                MAX_CHILDREN: 50,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload]),
                            TYPE: exports.cumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload]),
                            TYPE: exports.cumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload]),
                            TYPE: exports.cumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload]),
                            TYPE: exports.cumchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
exports.sDrone = {
        PARENT: [exports.drone],
        PERSISTS_AFTER_DEATH: true, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };

exports.droneSpammer = {
    PARENT: [exports.genericTank],
    LABEL: 't',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    MAX_CHILDREN: 200,
    CUSTOM: true,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 6, 0.8, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, {
        POSITION: [12, 6, 0.8, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.twin, g.puregunner, g.hurricane, g.doublereload, g.doublereload]),
            STAT_CALCULATOR: gunCalcNames.drone,
            TYPE: exports.sDrone,
            AUTOFIRE: true,
        },
    }, ],
};


exports.swarmminion = {
    PARENT: [exports.swarm],
    LABEL: 'Infector', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    SHAPE: 0,
    BODY: {
        FOV: 0.5,
        SPEED: 6,
        ACCELERATION: 0.8,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: [
    //    'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            AUTOFIRE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};


exports.virus = {
   PARENT: [exports.genericTank],
   LABEL: 'Virus',
   CUSTOM: true,
   STAT_NAMES: statnames.swarm,
   BODY: {
       SPEED: base.SPEED * 0.8,
       ACCELERATION: base.ACCEL * 0.5,
       FOV: 1.1,
   },
   GUNS: [ {
         POSITION: [ 19, 15, 0.7, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 17, 0.7, 4, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 12, 0.8, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, g.swarm, g.battle, g.carrier, g.thirdreload, g.minionswarmer, g.whatthe]),
            TYPE: exports.swarmminion,
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, 
     ],
};

exports.accelSymbol = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR:  9,
    SHAPE: 1000,
    CUSTOM: true,
    INDEPENDENT: true,
};
exports.accelSymbol2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR:  9,
    SHAPE: 4,
    CUSTOM: true,
    INDEPENDENT: true,
};

exports.accelerator = {
            PARENT: [exports.genericTank],
            LABEL: 'Accelerator',
            CUSTOM: true,
            FACING_TYPE: 'autospin',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 1.6,
                ACCELERATION: base.ACCEL * 1.6,
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
                REGEN: base.REGEN * 30,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            },],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
for (let i = 0; i < 6; i++) {
  exports.accelerator.TURRETS.push(
   {
     POSITION: [  3,   6,      0,      (360/6)*i,     360,  1,], 
     TYPE: exports.accelSymbol2,
   }
  )
}
exports.accelerator.TURRETS.push(
{ /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [  11,   0,      0,      0,     360,  1,], 
                TYPE: exports.accelSymbol,
            }
)

exports.healFruit = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0
    },
    LABEL: "Heal Fruit",
    CUSTOM: true,
    VALUE: 20,
    SHAPE: -4,
    DIPMULTI: 6,
    DAMAGE_CLASS: 0,
    SIZE: 5,
    COLOR: 12,
    BODY: {
        DAMAGE: -99999999999,
        DENSITY: 8,
        HEALTH: 0.5 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
        //HETERO: -1000,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

exports.dualFlare = {
   PARENT: [exports.genericTank],
   LABEL: 'Dual Flare',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 15, 4, 1.4, 6, -5, 0, 0, ],
         }, {
         POSITION: [ 15, 4, 1.4, 6, 5, 0, 0, ],
         }, {
         POSITION: [ 15, 10, 0.6, 0, -5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.twin, g.flare]),
            TYPE: exports.flare,
         }, }, {
         POSITION: [ 15, 10, 0.6, 0, 5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.twin, g.flare]),
            TYPE: exports.flare,
         }, }, 
     ],
};

exports.firestorm = {
   PARENT: [exports.genericTank],
   LABEL: 'Firestorm',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 15, 4, 1.4, 6, 0, -30, 0, ],
         }, {
         POSITION: [ 15, 4, 1.4, 6, 0, 30, 0, ],
         }, {
         POSITION: [ 10, 15, 0.6, 6, 0, -30, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.twin, g.bent, g.flare]),
            TYPE: exports.flare,
         }, }, {
         POSITION: [ 10, 15, 0.6, 6, 0, 30, 0.66666, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.twin, g.bent, g.flare]),
            TYPE: exports.flare,
         }, }, {
         POSITION: [ 15, 4, 1.4, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 15, 0.6, 8, 0, 0, 0.33333, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.twin, g.bent, g.flare]),
            TYPE: exports.flare,
         }, }, 
     ],
};

exports.quadFlare = {
   PARENT: [exports.genericTank],
   LABEL: 'Quad Flare',
   CUSTOM: true,
   GUNS: [ {
         POSITION: [ 15, 4, 1.4, 6, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 15, 0.6, 6, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.flank, g.flare]),
            TYPE: exports.flare,
         }, },  {
         POSITION: [ 15, 4, 1.4, 6, 0, 90, 0, ],
         }, {
         POSITION: [ 10, 15, 0.6, 6, 0, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.flank, g.flare]),
            TYPE: exports.flare,
         }, },  {
         POSITION: [ 15, 4, 1.4, 6, 0, 180, 0.5, ],
         }, {
         POSITION: [ 10, 15, 0.6, 6, 0, 180, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.flank]),
            TYPE: exports.flare,
         }, },  {
         POSITION: [ 15, 4, 1.4, 6, 0, 180+90, 0.5, ],
         }, {
         POSITION: [ 10, 15, 0.6, 6, 0, 180+90, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.flank]),
            TYPE: exports.flare,
         }, },  
     ],
};

exports.hexaFlare = {
   PARENT: [exports.genericTank],
   LABEL: 'Forest Fire',
   CUSTOM: true,
   GUNS: [ 
     ],
};

  for (let i = 0; i < 6; i++) {
exports.hexaFlare.GUNS.push(


      {
         POSITION: [ 15, 2, 1.4, 2, 0, (360/6)*i, 0, ],
         }, {
         POSITION: [ 10, 11, 0.6, 4, 0, (360/6)*i, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed, g.flank, g.flank, g.flare, g.halfreload]),
            TYPE: exports.flare,
         }, },  
)
}

// exports.mace = {
//             PARENT: [exports.genericTank],
//             LABEL: 'Mace',
//             DANGER: 6,
//             TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  21.5,   0,      0,      0,     360,  0,], 
//                 TYPE: exports.smasherBody,
//             }],
//             GUNS: [ {
//          POSITION: [ 0, 20, 1, 20, 0, 0, 0, ],
//          PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic, g.lancereal]),
//             TYPE: exports.bullet,
//             AUTOFIRE: true,
//          }, }, 
//      ],
//         };

// exports.maceChain1 = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Mace Chain',
//    CUSTOM: true,
//    TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  40,     24,      0,      0,     360,  0], 
//                     TYPE: exports.mace,
//                         },
//             ]
// };
// exports.maceChain2 = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Mace Chain',
//    CUSTOM: true,
//     TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  20,     24,      0,      0,     360,  0], 
//                     TYPE: exports.maceChain1,
//                         },
//             ]
// };
// exports.maceChain3 = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Mace Chain',
//    CUSTOM: true,
//   TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  20,     24,      0,      0,     360,  0], 
//                     TYPE: exports.maceChain2,
//                         },
//             ]
// };
// exports.maceChain4 = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Mace Chain',
//    CUSTOM: true,
//   TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  20,     24,      0,      0,     360,  0], 
//                     TYPE: exports.maceChain3,
//                         },
//             ]
// };
// exports.maceChain5 = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Mace Chain',
//    CUSTOM: true,
//   TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  20,     24,      0,      0,     360,  0], 
//                     TYPE: exports.maceChain4,
//                         },
//             ]
// };

// exports.brute = {
//    PARENT: [exports.genericTank],
//    LABEL: 'Brute',
//    CUSTOM: true,
//   TURRETS: [{         /*  SIZE     X       Y     ANGLE    ARC */
//                 POSITION: [  5,     12,      0,      0,     360,  0], 
//                     TYPE: exports.maceChain5,
//                         },
//             ]
// };


// exports.bouble = {
//    PARENT: [exports.block],
//    SHAPE: 0,
//    LABEL: 'Bouble',
//    INDEPENDENT: true, 
//    PERSISTS_AFTER_DEATH: true, 
//    SHOOT_ON_DEATH: true,
//    CUSTOM: true,
//    FACING_TYPE: 'autospin',
//    GUNS: [ {
//          POSITION: [ 15, 8, 1, 0, 0, -60, 0, ],
//          }, {
//          POSITION: [ 15, 8, 1, 0, 0, 60, 0, ],
//          }, {
//          POSITION: [ 15, 8, 1, 0, 0, -180, 0, ],
//          }, {
//          POSITION: [ 4, 8, 2, 14, 0, -60, 0, ],
//          PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic]),
//             TYPE: exports.trap,
//             SHOOT_ON_DEATH: true,
//          }, }, {
//          POSITION: [ 4, 8, 2, 14, 0, -180, 0, ],
//          PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic]),
//             TYPE: exports.trap,
//             SHOOT_ON_DEATH: true,
//          }, }, {
//          POSITION: [ 4, 8, 2, 14, 0, 60, 0, ],
//          PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic]),
//             TYPE: exports.trap,
//             SHOOT_ON_DEATH: true,
//          }, }, 
//      ],
// };

// exports.ghtdrgdhhtdg = {
//    PARENT: [exports.genericTank],
//    LABEL: 'ftgntfhtdh',
//    CUSTOM: true,
//    GUNS: [ {
//          POSITION: [ 23, 10, 1, 0, 0, 0, 0, ],
//          }, {
//          POSITION: [ 14, 8, 2, 0, 0, 0, 0, ],
//          }, {
//          POSITION: [ 4, 13, 0.1, 23, 0, 0, 0, ],
//          PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.trap]),
//             TYPE: exports.bouble,
//          }, }, 
//      ],
// };

exports.autoTurretWeak = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 2
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.weak, g.morerange, g.morespeed]),
                TYPE: exports.bullet,
            }, },
    ],
};

exports.miniBase = {
                PARENT: [exports.genericTank],
                LABEL: 'Minibase',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 6,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.2,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      -60,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      60,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      180,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },
               ]
            };

exports.superTank = {
                PARENT: [exports.genericTank],
                LABEL: 'Macrobase',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 4,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.2,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      45,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      45+90,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      45+180,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      45+270,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },
               ]
            };

exports.autoSuperTank = makeAuto(exports.superTank)

exports.radio = {
                PARENT: [exports.genericTank],
                LABEL: 'Radio',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 4,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.4,
                    SPEED: base.SPEED * 1.4,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      8,      0,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     8,      0,      0,     360,      1], 
                       TYPE: [exports.autoTurret, { CONTROLLERS: ['nearestDifferentMaster'],}],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     0,      8,      0,     360,      1], 
                       TYPE: [exports.autoTurret, { CONTROLLERS: ['nearestDifferentMaster'],}],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     0,      0,      0,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     -8,      -8,    0,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     -8,      0,     0,     360,      1], 
                       TYPE: [exports.autoTurret, { CONTROLLERS: ['nearestDifferentMaster'],}],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     0,      -8,     0,     360,      1], 
                       TYPE: [exports.autoTurret, { CONTROLLERS: ['nearestDifferentMaster'],}],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     -8,      8,     0,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      -8,     0,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },
               ]
            };

exports.deliveryDisk = {
                PARENT: [exports.genericTank],
                LABEL: 'Delivery Disk',
                DANGER: 7,
                COLOR: 16,
                STAT_NAMES: statnames.swarm,
                CONTROLLERS: ['spin'], 
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      -60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.autobee,
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,      60,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.autobee,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,      180,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.autobee,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, 
                ],
            };

exports.delivery = {
                PARENT: [exports.genericTank],
                LABEL: 'Delivery',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 4,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.1,
                    SPEED: base.SPEED * 1,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,      360,     1], 
                       TYPE: exports.deliveryDisk,
                  },
               ]
            };

exports.rod = {
   PARENT: [exports.trap],
   LABEL: 'Rod',
   SHAPE: [[]],
   FACING_TYPE: "turnWithSpeed",
   GUNS: [ {
         POSITION: [ 13, 7, 1, 0, 0, 0+90, 0, ],
         }, {
         POSITION: [ 13, 7, 1, 0, 0, 180+90, 0, ],
         }, {
         POSITION: [ 4, 7, 1.5, 13, 0, 0+90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.weak, g.morerange, g.morerange, g.morespeed, g.morereload, g.morereload, g.morereload, g.morereload]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
         }, }, {
         POSITION: [ 4, 7, 1.5, 13, 0, 180+90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.weak, g.morerange, g.morerange, g.morespeed, g.morereload, g.morereload, g.morereload, g.morereload]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
         }, }, 
     ],
};

exports.hotrod = {
                PARENT: [exports.genericTank],
                LABEL: 'Hotrod',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 6,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.2,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ {
         POSITION: [ 9, 17, 1.2, 5, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 21, 0.8, 15, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.rod,
         }, }, 
     ],
            };

exports.autohotrod = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-Hotrod',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 6,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.2,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ {
         POSITION: [ 9, 17, 1.2, 5, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 21, 0.8, 15, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.rod,
         }, }, 
     ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      -60,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      60,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },{       /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  5,     8,      0,      180,     360,      1], 
                       TYPE: [exports.autoTurretWeak, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
                  },
               ]
            };

exports.manTurret = {
                PARENT: [exports.genericTank],
                LABEL: 't',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.weak]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, },
                ],
            };

exports.man = {
   PARENT: [exports.trap],
   LABEL: 'Man',
   BODY: {
                    HEALTH: base.HEALTH * 0.2
                },
   SHAPE: [[]],
   FACING_TYPE: "turnWithSpeed",
};

exports.man = makeAuto(exports.man, "Man", {type: exports.manTurret})

exports.hotdrive = {
                PARENT: [exports.genericTank],
                LABEL: 'Hotswarm',
                DANGER: 7,
                CUSTOM: true,
                SHAPE: 6,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 1.2,
                    SPEED: base.SPEED * 1.2,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ {
         POSITION: [ 9, 17, 1.2, 5, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 21, 0.8, 15, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap,g.lessreload]),
            TYPE: exports.man,
         }, }, 
     ],
                TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.drivesymbol,
    }
               ]
            };


exports.punishment = {
                PARENT: [exports.genericTank],
                LABEL: 'punishment',
                CUSTOM: true,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.1,
                    SPEED: base.SPEED * 0.1,
                    FOV: base.FOV * 0.6,
                    HEALTH: base.HEALTH * 0.4
                },
            };

exports.air = {
    PARENT: [exports.bullet],
    CUSTOM: true,
    LABEL: 'Air',
    TYPE: 'Air',
    SHAPE: [[-1,-0.1],[1,-0.1],[1,0.1],[-1,0.1]],
    BODY: {
      PUSHABILITY: -500,
      DESNITY: 10,
    }
};

exports.bair = {
    PARENT: [exports.bullet],
    CUSTOM: true,
    LABEL: 'Air',
    TYPE: 'BAir',
    SHAPE: [[-1,-0.1],[1,-0.1],[1,0.1],[-1,0.1]],
    BODY: {
      PUSHABILITY: -500,
      DESNITY: 10,
    }
};

exports.grinder = {
            PARENT: [exports.genericTank],
            LABEL: 'Vacuum',
            DANGER: 6,
            CUSTOM: true,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
                SPEED: base.SPEED * 0.75,
                HEALTH: base.HEALTH * 1.2,
                REGEN: base.REGEN*2
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
            GUNS: [ {
         POSITION: [ 18, 12, 1.7, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 14,
         }, }, 
                   
            {
         POSITION: [ 18, 12, 1, -180, 0, -176.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
            LABEL: 'Nozzle',
            SKIN: 1,
         }, }, {
         POSITION: [ 18, 12, 1, -180, 0, 176.5, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
           LABEL: 'Nozzle',
            SKIN: 1,
         }, }, {
         POSITION: [ 18, 12, 1, -180, 0, -171, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
           LABEL: 'Nozzle',
            SKIN: 1,
         }, }, {
         POSITION: [ 18, 12, 1, -180, 0, 171, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
           LABEL: 'Nozzle',
            SKIN: 1,
         }, }, 
                   
                   
                   
                   {
         POSITION: [ 18, 12, 1, 8, 0, -176.5+180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuumRecoil]),
            TYPE: exports.bair,
            LABEL: 'Nozzle',
            SKIN: 1,
            ALT_FIRE: true
         }, }, {
         POSITION: [ 18, 12, 1, 8, 0, 176.5+180, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuumRecoil]),
            TYPE: exports.bair,
           LABEL: 'Nozzle',
            SKIN: 1,
            ALT_FIRE: true
         }, }, {
         POSITION: [ 18, 12, 1, 8, 0, -171+180, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuumRecoil]),
            TYPE: exports.bair,
           LABEL: 'Nozzle',
            SKIN: 1,
            ALT_FIRE: true
         }, }, {
         POSITION: [ 18, 12, 1, 8, 0, 171+180, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuumRecoil]),
            TYPE: exports.bair,
           LABEL: 'Nozzle',
            SKIN: 1,
            ALT_FIRE: true
         }, }, 
     ],
};

exports.shield = {
    PARENT: [exports.bullet],
    CUSTOM: true,
    LABEL: 'Shield',
    TYPE: 'Shield',
    DRAW_SELF: false
};

exports.deflectorsymbol = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    COLOR: "#263270",
    CUSTOM: true,
};

exports.deflector = {
    PARENT: [exports.genericTank],
    LABEL: 'Deflector',
    //todo: update the deflector to rely on the type and not the label
    CUSTOM: true,   
    BODY: {
       DAMAGE: base.DAMAGE * 0.5
    },
    IS_SMASHER: true, // only for engine accel
    STAT_NAMES: statnames.deflector,
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,     15,      1.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.deflector]),
            TYPE: exports.shield,
            LABEL: '',
            AUTOFIRE: true,
            SKIN: 4,
        }, }, 
      //todo: make bullet speed effect reflected bullet speed
    ],
    TURRETS: [{
                  /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [12,     14,      0,      0,     360, 0, ],
            TYPE: exports.deflectorsymbol,
        }
    ]
};

 exports.roomba = {
            PARENT: [exports.genericTank],
            LABEL: 'Roomba',
            CUSTOM: true,
            STAT_NAMES: statnames.generic,
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ {
         POSITION: [ 16, 8, 1.7, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 14,
         }, }, 
                   
            {
         POSITION: [ 18, 12, 1, -140, 0, 0+180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
            LABEL: 'Nozzle',
            SKIN: 1,
         }, }, {
         POSITION: [ 18, 12, 1, -140, 0, 10+180, 1/3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
           LABEL: 'Nozzle',
            SKIN: 1,
         }, }, {
         POSITION: [ 18, 12, 1, -140, 0, -10+180, 2/3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vacuum]),
            TYPE: exports.air,
           LABEL: 'Nozzle',
            SKIN: 1,
         }, },
                   
                   {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 

exports.blackholesymbol = {
    PARENT: [exports.genericTank],
    CUSTOM: true,
    SHAPE: 0,
    LABEL: 'Black Hole',
    TYPE: 'Blackhole',
    TYPE: 'bholeignore',
    COLOR: "#000000"
};

exports.blackholepow = {
    PARENT: [exports.bullet],
    CUSTOM: true,
    DRAW_SELF: false,
    LABEL: '',
    TYPE: 'bhole',
    COLOR: "#000000",
};

exports.blackhole = {
    PARENT: [exports.trap],
    CUSTOM: true,
    SHAPE: 0,
    DANGER: 100,
            //todo: perfectly center the gun 
    LABEL: 'Black Hole',
    TYPE: 'bholeignore',
  TURRETS: [{
                  /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [18,     0,      0,      0,     360, 1, ],
            TYPE: exports.blackholesymbol,
        }
    ],
  GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0,     300,      1,      150-30,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.deflector]),
            TYPE: exports.blackholepow,
            LABEL: '',
            AUTOFIRE: true,
            SKIN: 1,
        }, }, 
    ]
};

exports.singularity = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Singularity',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.blackhole]),
                    TYPE: exports.blackhole,
                    COLOR: "#000000"
                }, },
            ],
        };

exports.sourcerorsymbol = {
    PARENT: [exports.genericTank],
    CUSTOM: true,
    LABEL: '',
    SHAPE: 0
};

exports.sourcerdrone = {
     CONTROLLERS: [
        'hangOutNearMasterEven',
        'mapTargetToGoal'
    ], //aghhhhhhhhhhhhh
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 1,
        HEALTH: 2.3 * wepHealthFactor,
        DAMAGE: 8.25 * wepDamageFactor,
        SPEED: 5,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hardWithBuffer',
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    CUSTOM: true,
    LABEL: 'Powerball',
    INDEPENDENT: true,
    SHAPE: 0
};

exports.sourceror = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            MAX_CHILDREN: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 2,
                SPEED: base.SPEED * 1.2,
            },
            LABEL: 'Sourceror',
            TURRETS: [],
            FACING_TYPE: 'autospin',
  
            GUNS: [{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [            0,      8,      1,      1,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: exports.sourcerdrone,
            LABEL: '',
            AUTOFIRE: true,
            SKIN: 1,
        }, }, ]
        };

  for (let i = 0; i < 6; i++) {
exports.sourceror.TURRETS.push(
{
                  /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [4,     6,      0,      (360/6)*i,     360, 1, ],
            TYPE: exports.sourcerorsymbol,
}
)
}

exports.healersymbol = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    CUSTOM: true,
    LABEL: '',
    COLOR: 12,
    SHAPE: [[-0.2,0.8],[0.2,0.8],[0.2,0.2],[0.8,0.2],[0.8,-0.2],[0.2,-0.2],[0.2,-0.8],[-0.2,-0.8],[-0.2,-0.2],[-0.8,-0.2],[-0.8,0.2],[-0.2,0.2]],
    INDEPENDENT: true,
};

exports.healingBullet = {
  PARENT: [exports.bullet],
  TYPE: 'healing'
}

exports.healing = {
  //todo: keep the healing to room count ratio consistient
  PARENT: [exports.bullet],
  TYPE: 'healing',
  SIZE: 8,
  SHAPE: [[-0.2,0.8],[0.2,0.8],[0.2,0.2],[0.8,0.2],[0.8,-0.2],[0.2,-0.2],[0.2,-0.8],[-0.2,-0.8],[-0.2,-0.2],[-0.8,-0.2],[-0.8,0.2],[-0.2,0.2]],
  BODY: {
        RANGE: 5,
  }
}

exports.bighealer = {
    PARENT: [exports.dominator],
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Healer',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 0,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    FACING_TYPE: 'autospin',
    VALUE: 0,
    SIZE: 60,
    COLOR: 10,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
    HAS_NO_RECOIL: true,
    TURRETS: [
      {
                  /** SIZE     X       Y     ANGLE     ARC */
            POSITION: [18,     0,      0,       0,     360, 1, ],
            TYPE: exports.healersymbol,
      }, {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }
    ],
    GUNS: [{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    12,      8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.lessspeed, g.lessspeed]),
            TYPE: exports.healingBullet,
            LABEL: 'Healer',
            AUTOFIRE: true,
  }, }, {        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    12,      8,      1,      0,      0,      90,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.lessspeed, g.lessspeed]),
            TYPE: exports.healingBullet,
            LABEL: 'Healer',
            AUTOFIRE: true,
  }, }, {        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    12,      8,      1,      0,      0,      180,    0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.lessspeed, g.lessspeed]),
            TYPE: exports.healingBullet,
            LABEL: 'Healer',
            AUTOFIRE: true,
  }, }, {        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    12,      8,      1,      0,      0,      270,    0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.lessspeed, g.lessspeed]),
            TYPE: exports.healingBullet,
            LABEL: 'Healer',
            AUTOFIRE: true,
  }, }, ]
};


exports.spectator = {
    PARENT: [exports.genericTank],
    LABEL: 'Spectator',
    DAMAGE_CLASS: 1,
    CUSTOM: true,
    HAS_NO_RECOIL: true,
    INTANGIBLE: true,
    DANGER: 0,
    DRAW_HEALTH: false,
    DISPLAY_NAME: false,
    SHAPE: [[]],
    ACCEPTS_SCORE: false,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    CAN_BE_ON_LEADERBOARD: false,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    LEVEL: 45,
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    BODY: {
        FOV: 2,
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 0,
        RESIST: 100,
        STEALTH: 1,
        SPEED: 30,
        ACCELERATION: 30
    },
}

exports.cheeseburger = {
    PARENT: [exports.miniboss],
    LABEL: "Cheeseburger",
    NAME: 'Cheeseburger',
    COLOR: "#593c2d",
    CUSTOM: true,
    SHAPE: 0,
    SIZE: 27,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .6 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
  
    AI: {
        NO_LEAD: false
    },
    GUNS: [{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    10,      16,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.destroy, g.anni, g.morespeed, g.morespeed]),
            TYPE: [exports.drone, {COLOR:13}],
            LABEL: 'Cheeser',
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            COLOR: 13,
  }, }, {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    10,      16,      1,      0,      0,      120,      1/3,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.destroy, g.anni, g.morespeed, g.morespeed]),
            TYPE: [exports.drone, {COLOR:11}],
            LABEL: 'Lettucer',
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            COLOR: 11,
  }, },{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    10,      16,      1,      0,      0,      -120,      2/3,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.destroy, g.anni, g.morespeed, g.morespeed]),
            TYPE: [exports.drone, {COLOR:12}],
            LABEL: 'Tomater',
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            COLOR: 12,
  }, },],
    TURRETS: [{
        POSITION: [8, 12, 0, 180, 190, 0],
        TYPE: [exports.basic, {
            COLOR: 13,
            SHAPE: 4,
        }]
    }, {
        POSITION: [8, 12, 0, 60, 190, 0],
        TYPE: [exports.basic, {
            COLOR: 11,
            SHAPE: 16,
        }]
    }, {
        POSITION: [8, 12, 0, -60, 190, 0],
        TYPE: [exports.basic, {
            COLOR: 12
        }]
    }, {
        POSITION: [16, 0, 0, 0, 360, 1],
        TYPE: [exports.genericTank, {
            COLOR: "#dba37b"
        }]
    }]
};

exports.fallenmothership = {
    PARENT: [exports.miniboss],
    LABEL: "Mothership",
    NAME: 'Fallen Mothership',
    CUSTOM: true,
    DANGER: 10,
    COLOR: 18,
    SIZE: exports.genericTank.SIZE * (7 / 3),
    SHAPE: 16,
    STAT_NAMES: statnames.drone,
    VALUE: 5e5,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    BODY: {
        REGEN: 0,
        FOV: 1,
        SHIELD: 0,
        ACCEL: .4,
        SPEED: .6,
        HEALTH: 250,
        PUSHABILITY: .15,
        DENSITY: .4,
        DAMAGE: 3
    },
    HITS_OWN_TYPE: "pushOnlyTeam",
    GUNS: (() => {
        let e = [],
            T = [1];
        for (let e = 1; e < 8.5; e += .5) {
            let t = e / 16;
            T.push(t);
        }
        for (let t = 0; t < 16; t++) {
            let S = 22.5 * (t + 1),
                E = {
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership, g.lesshealth]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true
                };
            t % 2 == 0 && (E.TYPE = [exports.drone, {
                AI: {
                    skynet: false
                },
                INDEPENDENT: true,
                LAYER: 10,
                BODY: {
                    FOV: 2
                }
            }]);
            let O = {
                POSITION: [4.3, 3.1, 1.2, 8, 0, S, T[t]],
                PROPERTIES: E
            };
            e.push(O);
        }
        return e;
    })()
};

exports.nuclearbomb = {
  PARENT: [exports.genericTank],
  LABEL: 'Nuclear Bomb',
  CUSTOM: true,
  SIZE: 9999,
  LAYER: -10000,
  BODY: {
        HEALTH: 1000,
        RESIST: 100,
        DAMAGE: 0.1
  },
}

function addBarrelPreset(type, preset, LENGTH, WIDTH, X, Y, ANGLE, DELAY = 0, dronelimit = 0, altFire=false, gunSettings = []) {
  let output = JSON.parse(JSON.stringify(type));
  let spawner = null;
    switch(preset){
      case 1:
      case "trap":
        spawner = [{         /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  LENGTH, WIDTH,      1,    X,      Y,    ANGLE,  DELAY,   ],
                        }, {
                    POSITION: [   3,     WIDTH,     1.7,  LENGTH+X,Y,    ANGLE,  DELAY,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap].concat(gunSettings)),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            ALT_FIRE: altFire
                        }, },];
        break;
      case 2:
      case "drone":
        spawner = [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   LENGTH-12,     WIDTH+4,    1.2,     X+8,      Y,      ANGLE,      DELAY,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone].concat(gunSettings)),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    MAX_CHILDREN: dronelimit,
                  ALT_FIRE: altFire
                }, },];
      break;
      case 3:
      case "machine":
        spawner = [ {              /*** LENGTH      WIDTH   ASPECT      X       Y        ANGLE      DELAY */
            POSITION: [      LENGTH,     WIDTH,     1.4,     X+8,      Y,      ANGLE,      DELAY,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach].concat(gunSettings)),
                TYPE: exports.bullet,
                ALT_FIRE: altFire
            }, },
        ];
        break;
      case 4:
      case "decorated":  
        spawner = [ {     /*** LENGTH  WIDTH   ASPECT    X       Y       ANGLE   DELAY */
                    POSITION: [  LENGTH,     LENGTH,      1,      X,      Y,      ANGLE,      DELAY,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic].concat(gunSettings)),
                            TYPE: exports.bullet,
                            ALT_FIRE: altFire
                        }, },  {
                    POSITION: [  5.5,    WIDTH,    -1.8,    X+6.5,     Y,      ANGLE,      DELAY,   ],                         
                    }
                ];
      break;
      case 5:
      case "swarm":
        spawner = [ {     /*** LENGTH      WIDTH   ASPECT    X       Y         ANGLE       DELAY */
                POSITION: [   LENGTH,    LENGTH,    0.6,     X+7,      4,      ANGLE,      DELAY,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm].concat(gunSettings)),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm, 
                        ALT_FIRE: altFire
                    }, },
                   ]
      break;
      case 6:
      case "minion":
        spawner = [ { /**** LENGTH  WIDTH ASPECT     X             Y     ANGLE   DELAY */
                POSITION: [  4.5,  WIDTH-2, 1,   X+LENGTH+10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,    WIDTH,  1,   X+LENGTH+15,      0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory].concat(gunSettings)),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                    ALT_FIRE: altFire,
                    MAX_CHILDREN: dronelimit,
                }, }, {                        
                POSITION: [  LENGTH+3.5,    WIDTH,   1,      X+8,      0,      0,      0,   ], 
                }
            ];
      break;
      default:
        spawner = [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  LENGTH,     WIDTH,      1,      X,      Y,      ANGLE,      DELAY,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic].concat(gunSettings)),
            TYPE: exports.bullet,
          ALT_FIRE: altFire
        }, },];
    }
    if (type.GUNS == null) { output.GUNS = spawner; }
    else { output.GUNS = type.GUNS.concat(spawner); }
    return output;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.random = {
    PARENT: [exports.genericTank],
    LABEL: 'Randomized'
}

exports.random = addBarrelPreset(exports.random, "trap", 18, 8, 0, 0, 45, 0, 2, false, [])
exports.random = addBarrelPreset(exports.random, "minion", 3.5, 8, 0, 0, -45, 0.5, 2, false, [])


exports.booby = {
                PARENT: [exports.genericTank],
                LABEL: 'Booby-trapper',
                CUSTOM: true,
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.trapper,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.trapper,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.trapper,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0+60,     190, 0], 
                        TYPE: exports.trapper,
                            }, {
                    POSITION: [  12,     8,      0,     120+60,    190, 0], 
                        TYPE: exports.trapper,
                            }, {
                    POSITION: [  12,     8,      0,     240+60,    190, 0], 
                        TYPE: exports.trapper,
                            },
                ],
            };

exports.twintrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Trapper',
                CUSTOM: true,
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS:[  { /*** LENGTH  WIDTH   ASPECT      X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      6,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      6,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                       
                       { /*** LENGTH  WIDTH   ASPECT      X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      -6,      0,      0.5,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      -6,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };

exports.longauto = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-long',
                DANGER: 7,
                SHAPE: [[-3,-1],[3,-1],[3,1],[-3,1]],
                //FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      90,     180, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      12,      90,     180, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      24,      90,     270, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      -12,      90,     180, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      -24,      90,     270, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      12,      -90,     180, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      24,      -90,     270, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      -12,      -90,     180, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      -24,      -90,     270, 0], 
                        TYPE: exports.auto5gun,
                            }, { /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8,      0,      -90,     180, 0], 
                        TYPE: exports.auto5gun,
                            },
                          
                          {      /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8+20,      4,      0,     270, 0], 
                        TYPE: exports.auto5gun,
                            },
                          {      /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [       11,     8+20,      -4,      0,     270, 0], 
                        TYPE: exports.auto5gun,
                            },
                
                ]
            };

exports.tinyGenericTank = {
    PARENT: [exports.genericTank],
    CUSTOM: true,
    SIZE: 8,
    DIPMULTI: 1.5,
    SHAPE: -6,
    BODY: {
                    DENSITY: base.DENSITY * 0.5,
                    SPEED: base.SPEED * 2,
                    FOV: base.FOV * 1.25,
                    DAMAGE: base.DAMAGE * 0.5,
                    HEALTH: base.HEALTH * 0.75,
                    SHIELD: base.SHIELD * 0.75
      },
};

exports.tiny = {
    PARENT: [exports.tinyGenericTank],
    LABEL: 'Tiny', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        }, }, 
    ],
};

exports.tinyTwin = {
    PARENT: [exports.tinyGenericTank],
    LABEL: 'Tiny Twin', 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     9,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     9,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank]),
                TYPE: exports.bullet,
            }, }, 
    ],
};

exports.tinySniper = {
        PARENT: [exports.tinyGenericTank],
        LABEL: 'Tiny Sniper',
        BODY: {
            DENSITY: base.DENSITY * 0.5,
            SPEED: base.SPEED * 2,
            DAMAGE: base.DAMAGE * 0.5,
            HEALTH: base.HEALTH * 0.75,
            SHIELD: base.SHIELD * 0.75,
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2 * 1.25,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17+4,    9.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.tinyMachine = {
        PARENT: [exports.tinyGenericTank],
        LABEL: 'Tiny Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    13,     11,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.tinyFlank = {
        PARENT: [exports.tinyGenericTank],
        LABEL: 'Tiny Flank Guard',
        BODY: {
            DENSITY: base.DENSITY * 0.5,
            SPEED: base.SPEED * 2 * 1.1,
            FOV: base.FOV * 1.25,
            DAMAGE: base.DAMAGE * 0.5,
            HEALTH: base.HEALTH * 0.75,
            SHIELD: base.SHIELD * 0.75
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  17,     9,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  17,     9,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };

exports.tinyDirector = {
        PARENT: [exports.tinyGenericTank],
        LABEL: 'Tiny Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            DENSITY: base.DENSITY * 0.5,
            SPEED: base.SPEED * 2 * 1.1,
            FOV: base.FOV * 1.25 * 1.1,
            DAMAGE: base.DAMAGE * 0.5,
            HEALTH: base.HEALTH * 0.75,
            SHIELD: base.SHIELD * 0.75,
            ACCELERATION: base.ACCEL * 0.75,
        },
        MAX_CHILDREN: 6,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     13,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.flank]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };

exports.tinyPound = {
        PARENT: [exports.tinyGenericTank],
        DANGER: 5,
        BODY: {
            DENSITY: base.DENSITY * 0.5,
            SPEED: base.SPEED * 2,
            FOV: base.FOV * 1.25,
            DAMAGE: base.DAMAGE * 0.5,
            HEALTH: base.HEALTH * 0.75,
            SHIELD: base.SHIELD * 0.75,
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Tiny Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  19,    13,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.tinyTrapper = {
                PARENT: [exports.tinyGenericTank],
                LABEL: 'Tiny Trapper',
                BODY: {
                    DAMAGE: base.DAMAGE * 0.5,
                    HEALTH: base.HEALTH * 0.75,
                    SHIELD: base.SHIELD * 0.75,
                    DENSITY: base.DENSITY * 0.6 * 0.5,
                    SPEED: base.SPEED * 0.8 * 2,
                    FOV: base.FOV * 1.15 * 1.25,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     8,     1.7,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.flank]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };

exports.tinySmasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 7,
    INDEPENDENT: true,
};

exports.tinySmash = {
            PARENT: [exports.tinyGenericTank],
            LABEL: 'Tiny Smasher',
            SHAPE: 0,
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 2,
                DAMAGE: base.DAMAGE * 0.75,
                HEALTH: base.HEALTH * 0.75,
                SHIELD: base.SHIELD * 0.75,
                FOV: base.FOV * 1.05 * 1.25,
                DENSITY: base.DENSITY * 2 * 0.5,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.tinySmasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };





exports.doubletinyturret = {
    PARENT: [exports.tinyGenericTank],
    LABEL: '', 
    //COLOR: "master"
    FACING_TYPE: 'smoothToTarget',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        }, }, 
    ],
};

exports.doubletiny = {
    PARENT: [exports.genericTank],
    LABEL: 'Double Tiny', 
    CUSTOM: true,
    SHAPE: [[]],
    FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  10,     8,      0,      0,     360,  0], 
                    TYPE: exports.doubletinyturret,
                        },{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  10,     8,      0,      180,     360,  0], 
                    TYPE: exports.doubletinyturret,
                        },
  ]
};



exports.snipounder = {
        PARENT: [exports.genericTank],
        CUSTOM: true,
        LABEL: 'Snipounder',
        DANGER: 7,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    14,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.destroy]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.eliteTrapperTurret = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Septa-Trapper',
                    DANGER: 7,
                    COLOR: '#3256ba',
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                AUTOFIRE: true,
                            }, },
                    ],
                };
            })();

exports.eliteTrapper = {
    PARENT: [exports.elite],
    LABEL: "Elite Trapper",
    COLOR: '#3256ba',
    SHAPE: 12,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [{
        POSITION: [5, 10, 0, 0, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*1, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*2, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*3, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*4, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*5, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*6, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*7, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*8, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*9, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*10, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*11, 135, 0],
        TYPE: [exports.trapper, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: [exports.eliteTrapperTurret, { INDEPENDENT: true, CONTROLLERS: ['spin'] }]
    }, 
    ]
};



exports.worker = {
        PARENT: [exports.minion],
        LABEL: 'Worker',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.sawgun = {
    PARENT: [exports.genericTank],
    LABEL: 'Sawgun',
    CUSTOM: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     20,      1,      0,      0,      0,      0,   ], 
        }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.halfreload, g.morespeed, g.morespeed]),
            TYPE: exports.saw,
        }, },
    ]
};

exports.cabin = {
                PARENT: [exports.genericTank],
                LABEL: 'Cabin',
                DANGER: 7,
                COLOR: '#61574c',
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.worker,
                            STAT_CALCULATOR: gunCalcNames.minion,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   6,     14,      -1.2,      6,      0,      0,      0,   ], 
                    }
                ],
            };

exports.industfac = {
    PARENT: [exports.elite],
    LABEL: "Elite Industrialist",
    COLOR: '#61574c',
    SHAPE: 12,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [{
        POSITION: [7, 10, 0, 0, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [7, 10, 0, 60*1, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [7, 10, 0, 60*2, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [7, 10, 0, 60*3, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [7, 10, 0, 60*4, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [7, 10, 0, 60*5, 180, 0],
        TYPE: [exports.sawgun, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [16, 0, 0, 0, 360, 1],
        TYPE: exports.cabin
    }, 
    ]
};

exports.elitebasicturret = {
    PARENT: [exports.genericTank],
    COLOR: '#62a872',
    LABEL: '',
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.norecoil, g.morespeed, g.morehealth]),
            TYPE: exports.bullet,
            LABEL: '',                  
        }, },
    ],
};

exports.elitebasic = {
    PARENT: [exports.elite],
    LABEL: "Elite Basic",
    COLOR: '#62a872',
    SHAPE: 7,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .3 * base.SPEED,
        HEALTH: 8 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [ {
        POSITION: [16, 0, 0, 0, 360, 1],
        TYPE: exports.elitebasicturret
    }, 
    ]
};

exports.eliteMachineGunner = {
    PARENT: [exports.elite],
    LABEL: "Elite Machine Gunner",
    COLOR: '#FFA78B',
    SHAPE: 12,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [{
        POSITION: [5, 10, 0, 0, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*1, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*2, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*3, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*4, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*5, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*6, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*7, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*8, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*9, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*10, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [5, 10, 0, 30*11, 135, 0],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: [exports.machinegunner, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'] }]
    }, 
    ]
};


exports.eliteShotgun = {
    PARENT: [exports.elite],
    LABEL: "Elite Shotgun",
    COLOR: '#FF0000',
    SHAPE: 12,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [{
        POSITION: [5, 10, 0, 0, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*1, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*2, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*3, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*4, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*5, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*6, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*7, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*8, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*9, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*10, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*11, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, 
    ]
};

exports.eliteShotgunC = {
    PARENT: [exports.elite],
    LABEL: "Elite Shotgun",
    COLOR: '#FF0000',
    SHAPE: 12,
    CUSTOM: true,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    TURRETS: [{
        POSITION: [5, 10, 0, 0, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*1, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*2, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*3, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*4, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*5, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*6, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*7, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*8, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*9, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*10, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, {
        POSITION: [5, 10, 0, 30*11, 135, 0],
        TYPE: [exports.shotgun2, { INDEPENDENT: true, CONTROLLERS: ['nearestDifferentMaster'], BODY: { FOV: 0.3, } }]
    }, 
    ]
};

exports.elitePentagon = {
    PARENT: [exports.elite],
    LABEL: "Polygonist",
    COLOR: 36,
    SHAPE: -8,
    CUSTOM: true,
    SIZE: 30,
    VARIES_IN_SIZE: true,
    VALUE: 18e4,
    BODY: {
        FOV: 1.25,
        SPEED: .5 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    },
    MAX_CHILDREN: 30,
   GUNS: [ {      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  0,    6,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.morereload]),
                TYPE: [exports.pentagon, {CONTROLLERS: ['nearestDifferentMaster'], HITS_OWN_TYPE: 'hardWithBuffer'} ]
            }, },{      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  0,    4,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.morereload]),
                TYPE: [exports.triangle, {CONTROLLERS: ['nearestDifferentMaster'], HITS_OWN_TYPE: 'hardWithBuffer'} ]
            }, },{      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  0,    4,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.morereload]),
                TYPE: [exports.square, {CONTROLLERS: ['nearestDifferentMaster'], HITS_OWN_TYPE: 'hardWithBuffer'} ]
            }, },{      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  0,    2,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.morereload]),
                TYPE: [exports.egg, {CONTROLLERS: ['nearestDifferentMaster'], HITS_OWN_TYPE: 'hardWithBuffer'} ]
            }, },
        ],
};

//todo: replace bighealer with small drones that spawn randomly around in the room type that target and heal you, sorta like diep base drones

//Tank ideas:
//Singularity
////Shoots out a "black hole" that sucks in anything thats not the master, the actual back hole does high damage but it has low health

//More Ideas:
//Make the deflector and vacuum part of their own unique basic branch
//Singularity would branch from vacuum

//more ideas totally not stolen from woomy:
//A smasher that lets you dash
////Alt fire to preform it, multiplies your current velocity by your engine accel by some amount

//redesign the visuals of some of the older tanks
//like the eggmancer
//or that one mega swarmer


//beta/scrapped tanks
exports.crowbaraAutoTankGun = {
  PARENT: [exports.genericTank],
  LABEL: "",
  BETA: true,
  CUSTOM: true,
  BODY: {
    FOV: 3,
  },
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  COLOR: 16,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [22, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.crowbar = {
  PARENT: [exports.genericTank],
  DANGER: 6,
  LABEL: "Crowbar",
  BETA: true,
  BODY: {
    ACCELERATION: base.ACCEL * 0.6,
    SPEED: base.SPEED * 0.85,
    FOV: base.FOV * 1.4,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [37, 8.5, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
    },
  ],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [8, 38, 0, 0, 360, 1],
      TYPE: [
        exports.crowbaraAutoTankGun,
        {
          INDEPENDENT: true,
        },
      ],
    },
    {
      POSITION: [8, 28, 0, 0, 360, 1],
      TYPE: [
        exports.crowbaraAutoTankGun,
        {
          INDEPENDENT: true,
        },
      ],
    },
    {
      POSITION: [8, 18, 0, 0, 360, 1],
      TYPE: [
        exports.crowbaraAutoTankGun,
        {
          INDEPENDENT: true,
        },
      ],
    },
  ],
};
exports.vulcan = {
  PARENT: [exports.genericTank],
  LABEL: "Vulcan",
  DANGER: 7,
  BETA: true,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [28, 2, 1, 0, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [28, 2, 1, 0, -4, 0, 0.8],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [28, 2, 1, 0, 2.25, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [28, 2, 1, 0, -2.25, 0, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [28, 2, 1, 0, 0, 0, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [5, 13, 1, 7, 0, 0, 0],
    },
    {
      POSITION: [5, 13, 1, 20, 0, 0, 0],
    },
  ],
};
exports.accurator = {
  PARENT: [exports.genericTank],
  LABEL: "Accurator",
  BETA: true,
  DANGER: 7,
  BODY: {
    ACCELERATION: base.ACCEL * 0.5,
    SPEED: base.SPEED * 0.8,
    FOV: base.FOV * 1.5,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [5, 1, -5, 24, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.fake]),
        TYPE: exports.accelbullet,
      },
    },
    {
      POSITION: [16, 10, 1.4, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach]),
        TYPE: exports.accelbullet,
      },
    },
  ],
};

exports.crossbow = {
  PARENT: [exports.genericTank],
  LABEL: "Crossbow",
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.225,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [12.5, 3.5, 1, 0, 4, 25, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [12.5, 3.5, 1, 0, -4, -25, 0.6],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [15, 3.5, 1, 0, 4, 12.5, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [15, 3.5, 1, 0, -4, -12.5, 0.4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [20, 3.5, 1, 0, 4, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [20, 3.5, 1, 0, -4, 0, 0.2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.halfspeed,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [24, 7, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          g.slow,
          g.halfreload,
          g.halfrecoil,
        ]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.armsman = makeHybrid(exports.rifle, "Armsman");



exports.mendersymbol = {
  PARENT: [exports.genericTank],
  COLOR: 16,
  LABEL: "",
  SHAPE: 3,
};
exports.healerSymbol = {
  PARENT: [exports.genericTank],
  COLOR: 12,
  LABEL: "",
  SHAPE: [
    [0.3, -0.3],
    [1, -0.3],
    [1, 0.3],
    [0.3, 0.3],
    [0.3, 1],
    [-0.3, 1],
    [-0.3, 0.3],
    [-1, 0.3],
    [-1, -0.3],
    [-0.3, -0.3],
    [-0.3, -1],
    [0.3, -1],
  ],
};

exports.healerBullet = {
  PARENT: [exports.bullet],
  HITS_OWN_TYPE: "normal",
};
exports.physicianBody = {
  LABEL: "",
  BETA: true,
  CONTROLLERS: ["spin"],
  COLOR: 9,
  SHAPE: 4,
  INDEPENDENT: true,
};

// HEALER "WEAPONS"
exports.bigCheeseDrone = {
  PARENT: [exports.drone],
  BETA: true,
  BODY: {
    HEALTH: 2 * wepHealthFactor,
  },
};
exports.surgeonPillboxTurret = {
  PARENT: [exports.genericTank],
  LABEL: "",
  COLOR: 16,
  BODY: {
    FOV: 3,
  },
  HAS_NO_RECOIL: true,
  CONTROLLERS: ["fastspin"],
  //CONTROLLERS: ['nearestDifferentMaster'],
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17, 11, 1, 0, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
        TYPE: exports.healerBullet,
        AUTOFIRE: true,
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 11, 1, 0, 0, 90, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
        TYPE: exports.healerBullet,
        AUTOFIRE: true,
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17, 11, 1, 0, 0, 270, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
        TYPE: exports.healerBullet,
        AUTOFIRE: true,
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 11, 1, 0, 0, 270, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
        TYPE: exports.healerBullet,
        AUTOFIRE: true,
      },
    },
  ],
};
exports.surgeonPillbox = {
  LABEL: "Pillbox",
  PARENT: [exports.trap],
  SHAPE: -6,
  MOTION_TYPE: "motor",
  CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
  INDEPENDENT: true,
  BODY: {
    SPEED: 1,
    DENSITY: 5,
  },
  DIE_AT_RANGE: true,
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: exports.surgeonPillboxTurret,
    },
  ],
};
exports.doctorDrone = {
  PARENT: [exports.bigCheeseDrone],
  HITS_OWN_TYPE: "normal",
  BETA: true,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
};

exports.healer = {
  PARENT: [exports.genericTank],
  LABEL: "Healer",
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
    },
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
        TYPE: exports.healerBullet,
      },
    },
  ],
};
exports.medic = {
  PARENT: [exports.genericTank],
  LABEL: "Medic",
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.2,
  },
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [8, 9, -0.5, 16.5, 0, 0, 0],
    },
    {
      POSITION: [22, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
        TYPE: exports.healerBullet,
      },
    },
  ],
};
exports.ambulance = {
  PARENT: [exports.genericTank],
  LABEL: "Ambulance",
  BODY: {
    HEALTH: base.HEALTH * 0.8,
    SHIELD: base.SHIELD * 0.8,
    DENSITY: base.DENSITY * 0.6,
  },
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
    },
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flank,
          g.tri,
          g.trifront,
          g.tonsmorrecoil,
          g.healer,
        ]),
        TYPE: exports.healerBullet,
        LABEL: "Front",
      },
    },
    {
      POSITION: [16, 8, 1, 0, 0, 150, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [16, 8, 1, 0, 0, 210, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
        TYPE: exports.bullet,
        LABEL: gunCalcNames.thruster,
      },
    },
  ],
};
exports.surgeon = {
  PARENT: [exports.genericTank],
  LABEL: "Surgeon",
  STAT_NAMES: statnames.trap,
  BODY: {
    SPEED: base.SPEED * 0.75,
    FOV: base.FOV * 1.15,
  },
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [3, 14, 1, 15.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1.3, 18, 0, 0, 0],
      PROPERTIES: {
        MAX_CHILDREN: 2,
        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.slow]),
        TYPE: exports.surgeonPillbox,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [4, 14, 1, 8, 0, 0, 0],
    },
  ],
};
exports.paramedic = {
  PARENT: [exports.genericTank],
  LABEL: "Paramedic",
  BODY: {
    SPEED: base.SPEED * 0.9,
  },
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [8, 9, -0.5, 10, 0, -17.5, 0.5],
    },
    {
      POSITION: [15.5, 10, 1, 0, 0, -17.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.healer]),
        TYPE: exports.healerBullet,
      },
    },
    {
      POSITION: [8, 9, -0.5, 10, 0, 17.5, 0.5],
    },
    {
      POSITION: [15.5, 10, 1, 0, 0, 17.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.healer]),
        TYPE: exports.healerBullet,
      },
    },
    {
      POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
    },
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.healer]),
        TYPE: exports.healerBullet,
      },
    },
  ],
};
exports.physician = {
  PARENT: [exports.genericTank],
  LABEL: "Physician",
  BETA: true,
  BODY: {
    SPEED: base.speed * 0.9,
    DAMAGE: base.DAMAGE * -1.1,
    FOV: base.FOV * 1.05,
    DENSITY: base.DENSITY * 2,
  },
  IS_SMASHER: true,
  FACING_TYPE: "autospin",
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
  STAT_NAMES: statnames.smasher,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [18, 0, 0, 0, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 15, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 30, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 45, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [18, 0, 0, 60, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 75, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 90, 360, 0],
      TYPE: exports.physicianBody,
    },
    {
      POSITION: [18, 0, 0, 135, 360, 0],
      TYPE: exports.physicianBody,
    },
  ],
};
exports.doctor = {
  PARENT: [exports.genericTank],
  LABEL: "Doctor",
  BETA: true,
  STAT_NAMES: statnames.drone,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.15,
  },
  MAX_CHILDREN: 1,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.healerSymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17, 16, 1.25, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.over,
          g.verybigdrone,
          g.healer,
        ]),
        TYPE: exports.doctorDrone,
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: gunCalcNames.drone,
      },
    },
  ],
};

exports.mender = {
  PARENT: [exports.genericTank],
  LABEL: "Mender",
  DANGER: 7,
  BETA: true,
  TURRETS: [
    {
      /** SIZE     X       Y     ANGLE    ARC */
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: exports.mendersymbol,
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 10, 1, 0, 0, 180, 50],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.fake]),
        TYPE: exports.healerBullet,
        ALT_FIRE: true,
      },
    },
    {
      POSITION: [5, 20, 1, -21, 0, 0, 50],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
        TYPE: exports.healerBullet,
        ALT_FIRE: true,
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17, 3, 1, 0, -6, -7, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
        TYPE: exports.bullet,
        LABEL: "Secondary",
      },
    },
    {
      POSITION: [17, 3, 1, 0, 6, 7, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
        TYPE: exports.bullet,
        LABEL: "Secondary",
      },
    },
    {
      POSITION: [19, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
        TYPE: exports.bullet,
        LABEL: "Heavy",
      },
    },
  ],
};



function pages(name,tanks){
  var l=tanks.length,offset=0,page_number=1,page_name,prev_page,curr_page,start_page;
  do{
    page_name=name+"/PAGE "+page_number++;
    exports[page_name]=curr_page={
      "PARENT":[exports.genericTank],
      "SHAPE":1000,
      "LABEL":page_name,
      "UPGRADES_TIER_1":tanks.slice(offset,offset+=10),
      "CUSTOM":true
    };
    if(prev_page){
      curr_page.UPGRADES_TIER_1.push(prev_page);
      prev_page.UPGRADES_TIER_1.push(curr_page);
    }else start_page=curr_page;
    prev_page=curr_page;
  }while(offset<l);
  prev_page.UPGRADES_TIER_1.push(start_page);
  return start_page;
}


// UPGRADE PATHS

//testbed/betatester stuff
exports.testbed.UPGRADES_TIER_1 = [exports.betatester, exports.basic, exports.testbed5, exports.testbed2,exports.testbed3,exports.testbed4,exports.spectator,pages("everything",Object.values(exports))];//exports.testbed7];

exports.betatester.UPGRADES_TIER_1 = [exports.singularity,exports.sourceror,exports.longauto];

//exports.oldbetatester.UPGRADES_TIER_1 = [exports.basic,exports.supertest,exports.indust,exports.miner,exports.imposter,exports.nap,exports.furnace,exports.dumptruck,exports.exploder,exports.balli,exports.gen,exports.scattergun,exports.lancer,exports.archer,exports.betatester2,];
//exports.betatester2.UPGRADES_TIER_1 = [exports.oldbetatester, exports.teaser,exports.donutbasic,exports.demoman,exports.farmer,exports.poprocks]

exports.testbed2.UPGRADES_TIER_1 = [exports.arenaCloser, exports.mothership, exports.dominator, exports.dominationBody, exports.destroyerDominator, exports.gunnerDominator, exports.trapperDominator,]
exports.testbed3.UPGRADES_TIER_1 = [exports.elite_destroyer, exports.elite_gunner, exports.elite_sprayer, exports.elite_battleship, exports.palisade, exports.skimboss, exports.summoner, exports.nestKeeper, exports.testbed9];
exports.testbed4.UPGRADES_TIER_1 = [exports.hugePentagon, exports.bigPentagon, exports.pentagon, exports.triangle, exports.square, exports.egg, exports.greenpentagon, exports.gem, exports.obstacle, exports.babyObstacle, exports.crasher, exports.trapTurret, exports.sentrySwarm,exports.testbed6]
exports.testbed5.UPGRADES_TIER_1 = [exports.weenus,exports.ball,exports.bender,exports.omega,exports.dogeTest, exports.waffzTest, exports.mazeWallShooter, exports.reskins, exports.farmer, exports.donut, exports.hiveSpammer, exports.theOneshot, exports.nuclearbomb]
exports.testbed6.UPGRADES_TIER_1 = [exports.greenpentagon, exports.greentriangle, exports.greensquare]
//exports.testbed7.UPGRADES_TIER_1 = [exports.bullet, exports.casing, exports.flare, exports.swarm, exports.bee, exports.autoswarm, exports.homingbullet, exports.accelbullet, exports.growbullet, exports.trap, exports.block, exports.boomerang, exports.drone, exports.testbed9]
//exports.testbed8.UPGRADES_TIER_1 = [exports.sunchip, exports.autosunchip, exports.invissunchip, exports.gunchip, exports.missile, exports.twistmissile, exports.hypermissile, exports.snake, exports.hive]

exports.testbed9.UPGRADES_TIER_1 = [exports.centre,exports.centre2,exports.centre3,exports.centre4,exports.centre5, exports.cheeseburger, exports.eliteTrapper, exports.industfac, exports.elitebasic, exports.eliteMachineGunner, exports.eliteShotgun, exports.elitePentagon]




//Tanks

//,

//exports.punishment.UPGRADES_TIER_1 = []

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.trapper/*custom*/, /*exports.brute,*/exports.furnace,exports.miniBase];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa/*custom*/];
        exports.twin.UPGRADES_TIER_3 = [exports.dual, exports.bulwark, exports.musket/*custom*/,exports.twintrapper];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble/*custom*/,exports.scattergun];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple/*custom*/];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.guntrap, exports.hurricane, exports.overgunner/*custom*/,exports.poprocks];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle/*custom*/];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack/*custom*/,exports.snipounder];
        exports.assassin.UPGRADES_TIER_3 = [exports.falcon, exports.ranger, exports.stalker, exports.autoass/*custom*/,exports.archer];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind, exports.dual/*custom*/];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.minitrap/*custom*/];
        exports.rifle.UPGRADES_TIER_3 = [exports.musket, exports.crossbow,/*custom*/];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner/*custom*/];
        exports.machine.UPGRADES_TIER_3 = [exports.spray/*custom*/];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.tritrap/*custom*/];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.banshee/*custom*/];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hurricane, exports.hexatrap/*custom*/, exports.supertest];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.brutalizer, exports.eagle/*custom*/,exports.roomba];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact/*custom*/];
        exports.director.UPGRADES_TIER_3 = [exports.manager/*custom*/];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress/*custom*/,exports.teaser];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autolilfact/*custom*/,exports.cloner,exports.virus];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.banshee, exports.autoover, exports.drive/*custom*/,exports.overmancer];
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.maleficitor/*custom*/,exports.overmancer,exports.collector,exports.eggmacer];

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery/*custom*/];
        exports.pound.UPGRADES_TIER_3 = [exports.shotgun2, exports.eagle/*custom*/];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer, exports.twister/*custom*/, exports.balli];
        exports.destroy.UPGRADES_TIER_3 = [exports.conq, exports.anni, exports.hybrid, exports.construct, exports.hiveshooter/*custom*/,exports.demoman,exports.imposter,exports.snipounder];

    exports.trapper.UPGRADES_TIER_2 = [exports.builder, exports.tritrap, exports.flanktrap/*custom*/];
        exports.trapper.UPGRADES_TIER_3 = [exports.minitrap, exports.overtrap/*custom*/, exports.exploder,exports.twintrapper,exports.deflector];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer, exports.architect, exports.conq/*custom*/,exports.gen,exports.dumptruck,exports.miner,exports.indust,exports.supertest,exports.radar];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bomber, exports.bulwark, exports.bushwhack, exports.fortress, exports.guntrap/*custom*/];
        exports.tritrap.UPGRADES_TIER_3 = [exports.fortress, exports.hexatrap, exports.septatrap, exports.architect/*custom*/, exports.booby];

    exports.miniBase.UPGRADES_TIER_2 = [exports.superTank, exports.hotrod]
        exports.superTank.UPGRADES_TIER_3 = [exports.autoSuperTank, exports.radio, exports.delivery];
        exports.hotrod.UPGRADES_TIER_3 = [exports.autohotrod, exports.hotdrive];
    
    //exports.lancer.UPGRADES_TIER_2 = [exports.trilance,exports.knife,exports.sword,exports.invislancer];
    //exports.brute.UPGRADES_TIER_2 = [];

    exports.furnace.UPGRADES_TIER_2 = [exports.dualFlare, exports.quadFlare];
        exports.dualFlare.UPGRADES_TIER_3 = [exports.firestorm, exports.hexaFlare];
        exports.quadFlare.UPGRADES_TIER_3 = [exports.hexaFlare];

    exports.tiny.UPGRADES_TIER_3 = [exports.tinyTwin, exports.tinySniper, exports.tinyMachine, exports.tinyFlank, exports.tinyDirector, exports.tinyPound, exports.tinyTrapper, exports.tinySmash]

    exports.reskins.UPGRADES_TIER_1 = exports.basic.UPGRADES_TIER_1
    exports.farmer.UPGRADES_TIER_1 = exports.basic.UPGRADES_TIER_1
    exports.donut.UPGRADES_TIER_1 = exports.basic.UPGRADES_TIER_1

    exports.basic.UPGRADES_TIER_2 = [exports.smash/*custom*/,exports.tiny];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.landmine/*custom*/,exports.accelerator,exports.grinder];

        exports.basic.UPGRADES_TIER_3 = [exports.single/*custom*/];

    exports.reskins.UPGRADES_TIER_2 = exports.basic.UPGRADES_TIER_2
    exports.farmer.UPGRADES_TIER_2 = exports.basic.UPGRADES_TIER_2
    exports.donut.UPGRADES_TIER_2 = exports.basic.UPGRADES_TIER_2

    exports.reskins.UPGRADES_TIER_3 = exports.basic.UPGRADES_TIER_3
    exports.farmer.UPGRADES_TIER_3 = exports.basic.UPGRADES_TIER_3
    exports.donut.UPGRADES_TIER_3 = exports.basic.UPGRADES_TIER_3
