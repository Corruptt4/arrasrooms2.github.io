import { global } from "./global.js";
import { config } from "./config.js";
const util = {
  submitToLocalStorage: (e) => (
    localStorage.setItem(e + "Value", document.getElementById(e).value),
    localStorage.setItem(e + "Checked", document.getElementById(e).checked),
    !1
  ),
  retrieveFromLocalStorage: (e) => (
    (document.getElementById(e).value = localStorage.getItem(e + "Value")),
    (document.getElementById(e).checked =
      "true" === localStorage.getItem(e + "Checked")),
    !1
  ),
  handleLargeNumber: (e, t = !1) =>
    t && 0 == e
      ? ""
      : e < Math.pow(10, 3)
      ? "" + e.toFixed(0)
      : e < Math.pow(10, 6)
      ? (e / Math.pow(10, 3)).toFixed(2) + "k"
      : e < Math.pow(10, 9)
      ? (e / Math.pow(10, 6)).toFixed(2) + "m"
      : e < Math.pow(10, 12)
      ? (e / Math.pow(10, 9)).toFixed(2) + "b"
      : e < Math.pow(10, 15)
      ? (e / Math.pow(10, 12)).toFixed(2) + "t"
      : (e / Math.pow(10, 15)).toFixed(2) + "q",
  timeForHumans: (e) => {
    var t = e % 60,
      o = ((e /= 60), (e = Math.floor(e)) % 60),
      l = ((e /= 60), (e = Math.floor(e)) % 24),
      e = ((e /= 24), (e = Math.floor(e)));
    let a = "";
    function r(e, t) {
      e && (a = a + ("" === a ? "" : ", ") + e + " " + t + (1 < e ? "s" : ""));
    }
    return (
      r(e, "day"),
      r(l, "hour"),
      r(o, "minute"),
      r(t, "second"),
      (a = "" === a ? "less than a second" : a)
    );
  },
  addArticle: (e) => (/[aeiouAEIOU]/.test(e[0]) ? "an " + e : "a " + e),
  formatLargeNumber: (e) => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  pullJSON: (e) =>
    new Promise((t, o) => {
      const l = `${location.protocol}//${window.serverAdd}/lib/json/${e}.json`;
      console.log("Loading JSON from " + l),
        fetch(l)
          .then((e) => e.json())
          .then((e) => {
            console.log("JSON load from " + l + " complete"), t(e);
          })
          .catch((e) => {
            console.log("JSON load from " + l + " complete"), o(e);
          });
    }),
  lerp: (e, t, o, l = !1) => (
    l && (global.fps < 20 && (global.fps = 20), (o /= global.fps / 120)),
    e + o * (t - e)
  ),
  lerpAngle: (e, t, o, l) => {
    (e = { x: Math.cos(e), y: Math.sin(e) }),
      (t = { x: Math.cos(t), y: Math.sin(t) }),
      (e = { x: util.lerp(e.x, t.x, o, l), y: util.lerp(e.y, t.y, o, l) });
    return Math.atan2(e.y, e.x);
  },
  getRatio: () =>
    Math.max(global.screenWidth, (16 * global.screenHeight) / 9) /
    global.player.renderv,
  getScreenRatio: () =>
    Math.max(global.screenWidth, (16 * global.screenHeight) / 9) /
    global.screenSize,
  Smoothbar: (t, e, o = 0, l = 0.025) => {
    Date.now();
    let a,
      r = t,
      n;
    return {
      set: (e) => {
        t !== e && ((n = r), (t = e), (a = Date.now()));
      },
      get: (e = !1) => (
        (r = util.lerp(r, t, l)), (r = Math.abs(t - r) < 0.1 && e ? t : r)
      ),
    };
  },
  isInView: (e, t, o, l = !1) => {
    let a = util.getRatio();
    return (
      (o += config.graphical.borderChunk),
      l
        ? ((a *= 2),
          e > -global.screenWidth / a - o &&
            e < global.screenWidth / a + o &&
            t > -global.screenHeight / a - o &&
            t < global.screenHeight / a + o)
        : -o < e &&
          e < global.screenWidth / a + o &&
          -o < t &&
          t < global.screenHeight / a + o
    );
  },
  getEntityImageFromMockup: (e, t = global.mockups[e].color) => {
    let o = global.mockups[e];
    return {
      time: 0,
      index: e,
      x: o.x,
      y: o.y,
      vx: 0,
      vy: 0,
      size: o.size,
      realSize: o.realSize,
      color: t,
      render: {
        status: {
          getFade: () => 1,
          getColor: () => "#FFFFFF",
          getBlend: () => 0,
          health: { get: () => 1 },
          shield: { get: () => 1 },
        },
      },
      facing: o.facing,
      shape: o.shape,
      name: o.name,
      score: 0,
      tiggle: 0,
      layer: o.layer,
      guns: {
        length: o.guns.length,
        getPositions: () => {
          let e = [];
          return o.guns.forEach(() => e.push(0)), e;
        },
        update: () => {},
      },
      turrets: o.turrets.map((e) => {
        let t = util.getEntityImageFromMockup(e.index);
        return (
          (t.realSize = (t.realSize / t.size) * o.size * e.sizeFactor),
          (t.size = o.size * e.sizeFactor),
          (t.angle = e.angle),
          (t.offset = e.offset),
          (t.direction = e.direction),
          (t.facing = e.direction + e.angle),
          t
        );
      }),
    };
  },
};
export { util };
