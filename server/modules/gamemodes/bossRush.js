/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

function generateWaves() {
    let bosses = [Class.elite_destroyer, Class.elite_gunner, Class.elite_sprayer, Class.elite_battleship, Class.palisade, Class.skimboss, Class.summoner, Class.nestKeeper, Class.zaphkiel, Class.paladin, Class.enyo, Class.freyja, Class.theia].sort(() => 0.5 - Math.random());
    let finales = [Class.ragnarok, Class.kronos]
    const waves = (function() {
    class Wave {
         constructor(bosses, message) {
            this.bosses = bosses;
            this.message = message;
        }
      }
    for (let i = 0; i < 19; i ++) {
            bosses = bosses.sort(() => 0.5 - Math.random());
            const bosses = [];
            for (let x = 0; x < 2 + (Math.random() * 5 | 0); x ++) {
                bosses.push(bosses[x]);
            }
            waves.push(new Wave(bosses));
        }
        let output = output.concat(waves.sort((a, b) => a.bosses.length - b.bosses.length));
        for (let i = 0; i < waves.length; i ++) {
            if (i === 0) {
                output.push(new Wave([finales[i]], "Your end is here. We will end this."));
            } else {
                output.push(new Wave([finales[i]]));
            }
        }
        finales = finales.sort(() => .5 - Math.random());
        let celestialWaves = [];
        for (let i = 0; i < 5; i ++) {
            const bosses = [finales[i]];
            finales = finales.sort(() => 0.5 - Math.random());
            for (let x = 0; x < 1 + (Math.random() * 3 | 0); x ++) {
                bosses.push(finales[x]);
            }
            celestialWaves.push(new Wave(bosses));
        }
    })()
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
        for (let i = 0; i < 2; i ++) {
            let n = new Entity(room.randomType("boss"));
            n.define(ran.choose(bosses));
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
    }
    function spawnMothership() {
        return;
        sockets.broadcast("A Mothership has spawned!");
        let o = new Entity(room.randomType("bas1"));
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
    let spawn = (loc, team, type = false) => {
        type = type ? type : Class.destroyerDominator;
        let o = new Entity(loc);
        o.define(type);
        o.team = team;
        o.color = [10, 11, 12, 15][-team - 1] || 3;
        o.skill.score = 111069;
        o.name = "Dominator";
        o.SIZE = c.WIDTH / c.X_GRID / 10;
        o.isDominator = true;
        o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spinWhenIdle(o)];
        o.onDead = function() {
            if (o.team === -100) {
                spawn(loc, -1, type);
                room.setType("dom1", loc);
                sockets.broadcast("A dominator has been captured by BLUE!");
            } else {
                spawn(loc, -100, type);
                room.setType("dom0", loc);
                sockets.broadcast("A dominator has been captured by the bosses!");
            }
        };
    };

    function init() {
        for (let i = 0; i < 1; i++) spawnMothership();
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
                for (let i = 0; i < 4; i++) {
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