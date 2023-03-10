/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

function generateWaves() {
    let bosses = [Class.elite_gunner, Class.elite_spinner, Class.elite_devourer, Class.elite_sprayer, Class.elite_battleship, Class.super_uzi, Class.egger, Class.palisade, Class.skimboss, Class.abyssling, Class.summoner, Class.nestKeeper, Class.eliterifle, Class.pleistoros, Class.bossCele, Class.trimurti, Class.derzelas, Class.sabazios, Class.nyx, Class.theia, Class.zaphkiel, Class.paladin, Class.enyo, Class.freyja, Class.ganymede, Class.ridan, Class.fiolnir, Class.alviss, Class.tyr, Class.xukmes, Class.magmaporous, Class.thedisease, Class.kronos, Class.ragnarok, Class.glitchton, Class.legion_crash].sort(() => 1.25 - Math.random());
    let waves = [];
    for (let i = 0; i < 45; i++) {
        let wave = [];
        for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave.push(bosses[j]);
        bosses = bosses.sort(() => 0.5 - Math.random());
        waves.push(wave);
    }
  
    return waves;
};
const bossRush = (function() {
    let mothershipChoices = [Class.mothership];
    let waves = generateWaves()
    let wave = -1;
    let gameActive = true;
    let timer = 0;
    function spawnWave() {
        const wave = waves[index];
        if (!wave) {
            sockets.broadcast("Your team has beaten the boss rush!");
            return;
        }
        let bosses = wave.bosses.length;
        global.botScoreboard["Bosses Left"] = wave.bosses.length;
        for (let boss of wave.bosses) {
            let o = new Entity(room.randomType("boss"));
            o.define(boss);
            o.controllers.push(new ioTypes.bossRushAI(o));
            if (o.classSize < 35) {
                o.controllers.push(new ioTypes.pathFind(o));
            }
            o.team = -100;
            o.onDead = function() {
                bosses --;
                global.botScoreboard["Bosses Left"] = bosses;
                if (bosses <= 0) {
                    sockets.broadcast("The next wave will begin in 10 seconds.");
                    index ++;
                    setTimeout(spawnWave, 10000);
                }
            }
        }
        if (waves[index] == 15) {
          
        }
        if (waves[index] == 7) {
          if (room["nest"]) {
            for (let celes of wave.celes) {
              let o = new Entity (ran.roomType("nest"))
              sockets.broadcast("We are back. Now it's time to destroy you once for all.")
              o.define(celes)
              o.controllers.push(new ioTypes.bossRushAI(o));
              if (o.classSize < 35) {
                  o.controllers.push(new ioTypes.pathFind(o));
              }
              o.onDead = function() {
                bosses --;
                global.botScoreboard["Bosses Left"] = bosses;
                if (bosses <= 0) {
                    sockets.broadcast("The next wave will begin in 10 seconds.");
                    index ++;
                    setTimeout(spawnWave, 10000);
                }
              }
            }
          }
        }
        for (let i = 0; i < (Math.floor(Math.random() * waves[index])); i ++) {
            let n = new Entity(room.randomType("boss"));
            n.define(ran.choose(bosses));
            n.controllers.push(new ioTypes.bossRushAI(n), new ioTypes.pathFind(n));
            n.team = -100;
        }
        for (let i = 3; i < 6; i ++) {
            let n = new Entity(room.randomType("boss"));
            n.define(ran.choose(semiceles));
            n.controllers.push(new ioTypes.bossRushAI(n), new ioTypes.pathFind(n));
            n.team = -100;
        }
        global.botScoreboard.Wave = (index + 1);
        if (wave.message != null) {
            sockets.broadcast(wave.message);
            setTimeout(() => sockets.broadcast("Wave " + (index + 1) + " has arrived!"), 2000);
        } else {
            sockets.broadcast("Wave " + (index + 1) + " has arrived!");
        }
        if (bosses.length >= 5) {
          sockets.broadcast("Class 4 Dificulty. (Intermediate)")
        } else if (bosses.length >= 7) {
          sockets.broadcast("Class 5 Dificulty. (Hard)")
        } else if (bosses.length >= 3) {
          sockets.broadcast("Class 2 Dificulty. (Novice)")
        } else if (bosses.length >= 1) {
          sockets.broadcast("Class 1 Dificulty. (Easy)")
        }
    }
    function spawnMothership() {
        return;
        sockets.broadcast("A Mothership has spawned!");
        let o = new Entity(room.randomType("moth"));
        o.define(ran.choose(mothershipChoices));
        o.define({
            DANGER: 10
        });
        o.color = 10
        o.team = -1
        o.name = "Mothership";
        o.isMothership = true;
        o.controllers.push(new ioTypes.nearestDifferentMaster(o));
        o.controllers.push(new ioTypes.botMovement(o));
    };
    let maxSanctuaries = 4;
    let sanctuaries = 4;
    let spawn = (loc, team, type = false, type2 = false) => {
        type = type ? type : Class.sanctuary, Class.dominator;
        let o = new Entity(loc);
        o.define(type);
        o.team = team;
        o.color = [10, 11, 12, 15][-team - 1] || 3;
        o.skill.score = 111069;
        o.name = "Dominator";
        o.SIZE = c.WIDTH / c.X_GRID / 10;
        o.isDominator = true;
        o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spinWhenIdle(o)];
        o.onDead = () => {
                let e = new Entity(loc)
                e.define(Class.dominator);
                e.team = -100;
                e.color = 13;
                e.skill.score = 111069;
                e.name = "Dominator";
                e.SIZE = c.WIDTH / c.X_GRID / 10;
                e.isDominator = true;
                e.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spinWhenIdle(o)];
                room.setType("dom0", loc);
                sockets.broadcast("A dominator has been captured by the bosses!");
                e.onDead = () =>  {
                  let d = new Entity(loc);
                  d.define(Class.sanctuary);
                  d.team = team;
                  d.color = [10, 11, 12, 15][-team - 1] || 3;
                  d.skill.score = 111069;
                  d.name = "Dominator";
                  d.SIZE = c.WIDTH / c.X_GRID / 10;
                  d.isDominator = true;
                  d.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spinWhenIdle(o)];
                  room.setType("bas1", loc);
                  sockets.broadcast("A dominator has been captured by BLUE!");
                  d.onDead = o.onDead
                  o = d
                }
            }
    };
    
    function init() {
        for (let loc of room["bas1"]) spawn(loc, -1);
        console.log("Boss rush initialized.");
    };

    function getCensus() {
        let census = {
            bosses: 0,
            motherships: 0
        }
        loopThrough(entities, function(entry) {
            if (entry.isBoss) census.bosses++;
            if (entry.isMothership) census.motherships++;
        });
        return census;
    };

    function loop() {
        let census = getCensus();
        if (census.motherships < 1) spawnMothership();
        if (census.bosses === 0 && timer <= 0) {
            wave++;
            if (!waves[wave]) {
                if (!gameActive) return;
                gameActive = false;
                sockets.broadcast("BLUE has won the game!");
                setTimeout(closeArena, 1500);
                return;
            }
            sockets.broadcast(`Wave ${wave + 1} has arrived!`);
            for (let boss of waves[wave]) {
                let spot, m = 0;
                do {
                    spot = room.randomType("boss");
                    m++;
                } while (dirtyCheck(spot, 500) && m < 30);
                let o = new Entity(spot);
                o.define(boss);
                o.define({
                    DANGER: 25 + o.SIZE / 5
                });
                o.team = -100;
                o.FOV = 10;
                o.refreshBodyAttributes();
                o.isBoss = true;
                o.controllers.push(new ioTypes.bossRushAI(o));
                for (let i = 0; i < 2; i++) {
                    let n = new Entity(room.randomType("boss"));
                    n.define(ran.choose([Class.sentryGun, Class.sentrySwarm, Class.sentryTrap]));
                    n.team = -100;
                    n.FOV = 10;
                    n.refreshBodyAttributes();
                    n.controllers.push(new ioTypes.bossRushAI(n));
                }
                for (let i = 0; i < 3; i++) {
                    let n = new Entity(room.randomType("boss"));
                    n.define(Class.crasher);
                    n.team = -100;
                    n.FOV = 10;
                    n.refreshBodyAttributes();
                    n.controllers.push(new ioTypes.bossRushAI(n));
                }
            }
        } else if (census.bosses > 0) timer = 5;
        timer--;
    };
    return {
        init,
        loop
    };
})();

module.exports = {
    bossRush
};