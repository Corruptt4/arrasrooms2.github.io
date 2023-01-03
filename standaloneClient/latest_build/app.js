import { util } from "./lib/util.js";
import { global } from "./lib/global.js";
import { config } from "./lib/config.js";
import { Canvas } from "./lib/canvas.js";
import { color } from "./lib/color.js";
import * as socketStuff from "./lib/socketInit.js";
!(async function (we, fe, ye, e, be, t) {
  window.serverAdd = (await (await fetch("/serverData.json")).json()).ip;
  let {
      socketInit: r,
      gui: ke,
      leaderboard: ve,
      minimap: Ne,
      moveCompensation: g,
      lag: je,
      getNow: Me,
    } = t,
    c =
      (fetch("changelog.md", { cache: "no-cache" })
        .then((e) => e.text())
        .then((e) => {
          const t = e.split("\n\n").map((e) => e.split("\n"));
          console.log(t),
            t.forEach((e) => {
              (e[0] = e[0].split(":").map((e) => e.trim())),
                (document.getElementById(
                  "patchNotes"
                ).innerHTML += `<div><b>${e[0][0].slice(1).trim()}</b>: ${
                  e[0].slice(1).join(":") || "Update lol"
                }<ul>${e
                  .slice(1)
                  .map((e) => `<li>${e.slice(1).trim()}</li>`)
                  .join("")}</ul><hr></div>`);
            });
        }),
      we.pullJSON("mockups").then((e) => (fe.mockups = e)),
      ((e) => {
        class t {
          constructor(e, t, r = 0.05) {
            (this.start = e),
              (this.to = t),
              (this.value = e),
              (this.smoothness = r);
          }
          reset() {
            return (this.value = this.start), this.value;
          }
          getLerp() {
            return (
              (this.value = we.lerp(this.value, this.to, this.smoothness, !0)),
              this.value
            );
          }
          getNoLerp() {
            return (this.value = this.to), this.value;
          }
          get() {
            return ye.graphical.fancyAnimations
              ? this.getLerp()
              : this.getNoLerp();
          }
          flip() {
            var e = this.to,
              t = this.start;
            (this.start = e), (this.to = t);
          }
          goodEnough(e = 0.5) {
            return Math.abs(this.to - this.value) < e;
          }
        }
        let r = {};
        return (
          (r.connecting = new t(1, 0)),
          (r.disconnected = new t(1, 0)),
          (r.deathScreen = new t(1, 0)),
          (r.upgradeMenu = new t(0, 1, 0.01)),
          (r.skillMenu = new t(0, 1, 0.01)),
          (r.optionsMenu = new t(1, 0)),
          (r.minimap = new t(-1, 1, 0.025)),
          (r.leaderboard = new t(-1, 1, 0.025)),
          (e.animations = r)
        );
      })(window)),
    xe = (e, t, r = 0.5) => {
      if (1 === r) return t;
      if (0 === r) return e;
      for (var a = "#", i = 1; i <= 6; i += 2) {
        for (
          var n = s(t.substr(i, 2)),
            l = s(e.substr(i, 2)),
            o = Math.floor(l + (n - l) * r).toString(16);
          o.length < 2;

        )
          o = "0" + o;
        a += o;
      }
      return a;
    };
  function s(e) {
    return parseInt(e, 16);
  }
  function Se(e) {
    switch (e) {
      case 0:
        return be.teal;
      case 1:
        return be.lgreen;
      case 2:
        return be.orange;
      case 3:
        return be.yellow;
      case 4:
        return be.lavender;
      case 5:
        return be.pink;
      case 6:
        return be.vlgrey;
      case 7:
        return be.lgrey;
      case 8:
        return be.guiwhite;
      case 9:
        return be.black;
      case 10:
        return be.blue;
      case 11:
        return be.green;
      case 12:
        return be.red;
      case 13:
        return be.gold;
      case 14:
        return be.purple;
      case 15:
        return be.magenta;
      case 16:
        return be.grey;
      case 17:
        return be.dgrey;
      case 18:
        return be.white;
      case 19:
        return be.guiblack;
      default:
        return "#FF0000";
    }
  }
  function a(e) {
    var t = ye.graphical.neon ? be.white : be.black;
    return ye.graphical.darkBorders ? t : xe(e, t, be.border);
  }
  function We(e, t) {
    switch (e) {
      case "bas1":
      case "bap1":
      case "dom1":
        return be.blue;
      case "bas2":
      case "bap2":
      case "dom2":
        return be.green;
      case "bas3":
      case "bap3":
      case "dom3":
      case "boss":
        return be.red;
      case "bas4":
      case "bap4":
      case "dom4":
        return be.magenta;
      case "nest":
        return t ? be.purple : be.lavender;
      case "dom0":
        return be.gold;
      default:
        return t ? be.white : be.lgrey;
    }
  }
  function B(e, t) {
    ye.graphical.neon
      ? ((e.fillStyle = a(t)), (e.strokeStyle = t))
      : ((e.fillStyle = t), (e.strokeStyle = a(t)));
  }
  fe.player = {
    id: -1,
    x: fe.screenWidth / 2,
    y: fe.screenHeight / 2,
    vx: 0,
    vy: 0,
    cx: 0,
    cy: 0,
    renderx: fe.screenWidth / 2,
    rendery: fe.screenHeight / 2,
    renderv: 1,
    slip: 0,
    view: 1,
    time: 0,
    screenWidth: fe.screenWidth,
    screenHeight: fe.screenHeight,
    nameColor: "#ffffff",
  };
  var He = 0,
    i = 0,
    Ae = 0;
  (fe.clearUpgrades = () => {
    ke.upgrades = [];
  }),
    (fe.player = fe.player),
    (fe.canUpgrade = !1),
    (fe.canSkill = !1),
    (fe.message = ""),
    (fe.time = 0),
    (fe.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
      navigator.userAgent
    ));
  function n() {
    let e = window.devicePixelRatio;
    ye.graphical.fancyAnimations || (e *= 0.5),
      (l.width = fe.screenWidth = window.innerWidth * e),
      (l.height = fe.screenHeight = window.innerHeight * e),
      (fe.ratio = e),
      (fe.screenSize = Math.min(1920, Math.max(window.innerWidth, 1280)));
  }
  (window.onload = () => {
    we.pullJSON("gamemodeData").then((e) => {
      document.getElementById(
        "serverName"
      ).innerHTML = `<h4 class="nopadding">${e.gameMode} | ${e.players} Players</h4>`;
    }),
      we.retrieveFromLocalStorage("playerNameInput"),
      we.retrieveFromLocalStorage("playerKeyInput"),
      we.retrieveFromLocalStorage("optScreenshotMode"),
      we.retrieveFromLocalStorage("optPredictive"),
      we.retrieveFromLocalStorage("optFancy"),
      we.retrieveFromLocalStorage("coloredHealthbars"),
      we.retrieveFromLocalStorage("optColors"),
      we.retrieveFromLocalStorage("optNoPointy"),
      we.retrieveFromLocalStorage("optBorders"),
      "" === document.getElementById("optColors").value &&
        (document.getElementById("optColors").value = "normal"),
      "" === document.getElementById("optBorders").value &&
        (document.getElementById("optBorders").value = "normal"),
      (document.getElementById("startButton").onclick = () => h()),
      (document.onkeydown = (e) => {
        (e.which || e.keyCode) !== fe.KEY_ENTER ||
          (!fe.dead && fe.gameStart) ||
          h();
      }),
      window.addEventListener("resize", n),
      n();
  }),
    (window.resizeEvent = n),
    (window.canvas = new e());
  var l = window.canvas.cv,
    Ie = l.getContext("2d"),
    E = document.createElement("canvas").getContext("2d");
  function o(t, e, r, a = 0.025) {
    Date.now();
    let i,
      n = t,
      l;
    return {
      set: (e) => {
        t !== e && ((l = n), (t = e), (i = Date.now()));
      },
      get: (e = !1) => (
        (n = we.lerp(n, t, a)), (n = Math.abs(t - n) < 0.1 && e ? t : n)
      ),
    };
  }
  function h() {
    switch (
      (we.submitToLocalStorage("optScreenshotMode"),
      (ye.graphical.screenshotMode =
        document.getElementById("optScreenshotMode").checked),
      we.submitToLocalStorage("optFancy"),
      (ye.graphical.pointy = !document.getElementById("optNoPointy").checked),
      we.submitToLocalStorage("optNoPointy"),
      (ye.graphical.fancyAnimations =
        !document.getElementById("optFancy").checked),
      we.submitToLocalStorage("coloredHealthbars"),
      (ye.graphical.coloredHealthbars =
        document.getElementById("coloredHealthbars").checked),
      we.submitToLocalStorage("optPredictive"),
      (ye.lag.unresponsive = document.getElementById("optPredictive").checked),
      we.submitToLocalStorage("optBorders"),
      document.getElementById("optBorders").value)
    ) {
      case "normal":
        ye.graphical.darkBorders = ye.graphical.neon = !1;
        break;
      case "dark":
        (ye.graphical.darkBorders = !0), (ye.graphical.neon = !1);
        break;
      case "glass":
        (ye.graphical.darkBorders = !1), (ye.graphical.neon = !0);
        break;
      case "neon":
        ye.graphical.darkBorders = ye.graphical.neon = !0;
    }
    we.submitToLocalStorage("optColors");
    var e = document.getElementById("optColors").value,
      e =
        ((be = be["" === e ? "normal" : e]),
        document.getElementById("playerNameInput"));
    let t = document.getElementById("playerKeyInput");
    we.submitToLocalStorage("playerNameInput"),
      we.submitToLocalStorage("playerKeyInput"),
      (fe.playerName = fe.player.name = e.value),
      (fe.playerKey = t.value.replace(/(<([^>]+)>)/gi, "").substring(0, 64)),
      (fe.screenWidth = window.innerWidth),
      (fe.screenHeight = window.innerHeight),
      (document.getElementById("startMenuWrapper").style.maxHeight = "0px"),
      (document.getElementById("gameAreaWrapper").style.opacity = 1),
      fe.socket || (fe.socket = r(3e3)),
      fe.animLoopHandle || d(),
      (window.canvas.socket = fe.socket),
      setInterval(() => g.iterate(fe.socket.cmd.getMotion()), 1e3 / 30),
      document.getElementById("gameCanvas").focus(),
      (window.onbeforeunload = () => !0);
  }
  function Pe(e, t) {
    (Ie.fillStyle = e),
      (Ie.globalAlpha = t),
      Ie.fillRect(0, 0, fe.screenWidth, fe.screenHeight),
      (Ie.globalAlpha = 1);
  }
  (E.imageSmoothingEnabled = !1),
    (fe.player = {
      vx: 0,
      vy: 0,
      lastvx: 0,
      lastvy: 0,
      renderx: fe.player.cx,
      rendery: fe.player.cy,
      lastx: fe.player.x,
      lasty: fe.player.y,
      cx: 0,
      cy: 0,
      target: window.canvas.target,
      name: "",
      lastUpdate: 0,
      time: 0,
      nameColor: "#ffffff",
    });
  const f = "bold",
    Te = (e, t, r = !1) => (
      (t += ye.graphical.fontSizeBoost),
      (Ie.font = f + " " + t + "px Ubuntu"),
      r
        ? { width: Ie.measureText(e).width, height: t }
        : Ie.measureText(e).width
    ),
    Fe = (() => {
      let e = (i = null) => {
        let e = !0;
        return {
          update: (r) => {
            let a = !1;
            if (null == i) a = !0;
            else
              switch ((typeof r != typeof i && (a = !0), typeof r)) {
                case "number":
                case "string":
                  r !== i && (a = !0);
                  break;
                case "object":
                  if (Array.isArray(r)) {
                    if (r.length !== i.length) a = !0;
                    else
                      for (let e = 0, t = r.length; e < t; e++)
                        r[e] !== i[e] && (a = !0);
                    break;
                  }
              }
            a && ((e = !0), (i = r));
          },
          publish: () => i,
          check: () => !!e && !(e = !1),
        };
      };
      return () => {
        let p = [e(""), e(0), e(0), e(1), e("#FF0000"), e("left")];
        p.map((e) => e.publish());
        let m = 0,
          w;
        return {
          draw: (e, t, r, a, i, n = "left", l = !1, o, s = !0, c = Ie) => {
            (a += ye.graphical.fontSizeBoost),
              p[0].update(e),
              p[1].update(t),
              p[2].update(r),
              p[3].update(a),
              p[4].update(i),
              p[5].update(n);
            let h = a / 5,
              d = 1;
            c.getTransform && ((g = Ie.getTransform()), (d = g.d), (h *= d)),
              1 !== d && (a *= d),
              (c.font = f + " " + a + "px Ubuntu");
            var g,
              u = Ie.measureText(e);
            switch (n) {
              case "left":
                m = h;
                break;
              case "center":
                m = (u.width + 2 * h) / 2;
                break;
              case "right":
                m = u.width + 2 * h - h;
            }
            (w = (a + 2 * h) / 2),
              (c.lineWidth = (a + 1) / ye.graphical.fontStrokeRatio),
              (c.font = f + " " + a + "px Ubuntu"),
              (c.textAlign = n),
              (c.textBaseline = "middle"),
              (c.strokeStyle = be.black),
              (c.fillStyle = i),
              c.save(),
              1 !== d && c.scale(1 / d, 1 / d),
              (c.lineCap = ye.graphical.miterText ? "miter" : "round"),
              (c.lineJoin = ye.graphical.miterText ? "miter" : "round"),
              s &&
                c.strokeText(
                  e,
                  m + Math.round(t * d - m),
                  w + Math.round(r * d - w * (l ? 1.05 : 1.5))
                ),
              c.fillText(
                e,
                m + Math.round(t * d - m),
                w + Math.round(r * d - w * (l ? 1.05 : 1.5))
              ),
              c.restore();
          },
          remove: () => {},
        };
      };
    })();
  function Be(e, t, r, a, i = !1) {
    switch (i) {
      case !0:
        Ie.strokeRect(e, t, r, a);
        break;
      case !1:
        Ie.fillRect(e, t, r, a);
    }
  }
  function Ee(e, t, r, a = !1) {
    Ie.beginPath(),
      Ie.arc(e, t, r, 0, 2 * Math.PI),
      a ? Ie.stroke() : Ie.fill();
  }
  function Le(e, t, r, a) {
    Ie.beginPath(),
      Ie.lineTo(Math.round(e) + 0.5, Math.round(t) + 0.5),
      Ie.lineTo(Math.round(r) + 0.5, Math.round(a) + 0.5),
      Ie.closePath(),
      Ie.stroke();
  }
  function Ce(e, t, r, a, i) {
    Ie.beginPath(),
      Ie.lineTo(e, r),
      Ie.lineTo(t, r),
      (Ie.lineWidth = a),
      (Ie.strokeStyle = i),
      Ie.closePath(),
      Ie.stroke();
  }
  const ze = (
    e,
    t,
    r,
    a,
    i = 1,
    n = 1,
    l = 0,
    o = !1,
    s = !1,
    c = !1,
    h = r.render
  ) => {
    let d = s || Ie,
      g = c ? 1 : h.status.getFade(),
      u = n * a * r.size,
      p = fe.mockups[r.index],
      m = e,
      w = t,
      f = !1 === c ? r : c;
    if (0 !== g && 0 !== i) {
      if (
        (h.expandsWithDeath && (u *= 1 + 0.5 * (1 - g)),
        !ye.graphical.fancyAnimations || s == E || (1 === g && 1 === i))
      ) {
        if (g * i < 0.5) return;
      } else
        ((d = E).canvas.width = d.canvas.height = u * p.position.axis + 20 * a),
          (m =
            d.canvas.width / 2 -
            (u * p.position.axis * p.position.middle.x * Math.cos(l)) / 4),
          (w =
            d.canvas.height / 2 -
            (u * p.position.axis * p.position.middle.x * Math.sin(l)) / 4),
          d.translate(0.5, 0.5);
      if (
        ((d.lineCap = "round"),
        (d.lineJoin = "round"),
        f.turrets.length !== p.turrets.length)
      )
        throw new Error("Mismatch turret number with mockup.");
      for (let e = 0; e < p.turrets.length; e++) {
        var y,
          b,
          k = p.turrets[e];
        null == f.turrets[e].lerpedFacing
          ? (f.turrets[e].lerpedFacing = f.turrets[e].facing)
          : (f.turrets[e].lerpedFacing = we.lerpAngle(
              f.turrets[e].lerpedFacing,
              f.turrets[e].facing,
              0.1,
              !0
            )),
          0 === k.layer &&
            ((y = k.direction + k.angle + l),
            (b = k.offset * u),
            ze(
              m + b * Math.cos(y),
              w + b * Math.sin(y),
              k,
              a,
              1,
              (u / a / k.size) * k.sizeFactor,
              f.turrets[e].lerpedFacing + o * l,
              o,
              d,
              f.turrets[e],
              h
            ));
      }
      if (
        (f.guns.update(),
        (d.lineWidth = Math.max(
          ye.graphical.mininumBorderChunk,
          a * ye.graphical.borderChunk
        )),
        B(d, xe(be.grey, h.status.getColor(), h.status.getBlend())),
        f.guns.length !== p.guns.length)
      )
        throw new Error("Mismatch gun number with mockup.");
      var v,
        M,
        x,
        S = f.guns.getPositions();
      for (let e = 0; e < p.guns.length; e++) {
        var W = p.guns[e],
          H = S[e] / (1 === W.aspect ? 2 : 1),
          A =
            W.offset * Math.cos(W.direction + W.angle + l) +
            (W.length / 2 - H) * Math.cos(W.angle + l),
          I =
            W.offset * Math.sin(W.direction + W.angle + l) +
            (W.length / 2 - H) * Math.sin(W.angle + l);
        (v = d),
          (A = m + u * A),
          (I = w + u * I),
          (H = u * (W.length / 2 - (1 === W.aspect ? 2 * H : 0))),
          (M = (u * W.width) / 2),
          (x = W.aspect),
          (W = W.angle + l),
          (M = 0 < x ? [M * x, M] : [M, -M * x]),
          (x = [Math.atan2(M[0], H), Math.atan2(M[1], H)]),
          (H = [
            Math.sqrt(H * H + M[0] * M[0]),
            Math.sqrt(H * H + M[1] * M[1]),
          ]),
          v.beginPath(),
          v.lineTo(
            A + H[0] * Math.cos(W + x[0]),
            I + H[0] * Math.sin(W + x[0])
          ),
          v.lineTo(
            A + H[1] * Math.cos(W + Math.PI - x[1]),
            I + H[1] * Math.sin(W + Math.PI - x[1])
          ),
          v.lineTo(
            A + H[1] * Math.cos(W + Math.PI + x[1]),
            I + H[1] * Math.sin(W + Math.PI + x[1])
          ),
          v.lineTo(
            A + H[0] * Math.cos(W - x[0]),
            I + H[0] * Math.sin(W - x[0])
          ),
          v.closePath(),
          v.stroke(),
          v.fill();
      }
      if (
        ((d.globalAlpha = 1),
        B(d, xe(Se(r.color), h.status.getColor(), h.status.getBlend())),
        !(function (t, r, a, i, n, l = 0, e = !0) {
          var o, s;
          if (((l += n % 2 ? 0 : Math.PI / n), t.beginPath(), !n))
            return (
              (o = t.fillStyle),
              (s = t.strokeStyle),
              (i += t.lineWidth / 4),
              t.arc(r, a, i + t.lineWidth / 4, 0, 2 * Math.PI),
              (t.fillStyle = s),
              t.fill(),
              t.closePath(),
              t.beginPath(),
              t.arc(r, a, i - t.lineWidth / 4, 0, 2 * Math.PI),
              (t.fillStyle = o),
              t.fill(),
              t.closePath()
            );
          if (n < 0) {
            ye.graphical.pointy && (t.lineJoin = "miter");
            var c = 1 - 6 / n / n;
            (n = -n), t.moveTo(r + i * Math.cos(l), a + i * Math.sin(l));
            for (let e = 0; e < n; e++) {
              var h = ((e + 1) / n) * 2 * Math.PI,
                d = ((e + 0.5) / n) * 2 * Math.PI,
                d = {
                  x: r + i * c * Math.cos(d + l),
                  y: a + i * c * Math.sin(d + l),
                },
                h = { x: r + i * Math.cos(h + l), y: a + i * Math.sin(h + l) };
              t.quadraticCurveTo(d.x, d.y, h.x, h.y);
            }
          } else if (600 === n)
            for (let e = 0; e < 6; e++) {
              var g = (e / 6) * 2 * Math.PI,
                u = r + 1.1 * i * Math.cos(30 + g + l + 0.385),
                g = a + 1.1 * i * Math.sin(30 + g + l + 0.385);
              t.lineTo(u, g);
            }
          else if (0 < n)
            for (let e = 0; e < n; e++) {
              var p = (e / n) * 2 * Math.PI,
                m = r + i * Math.cos(p + l),
                p = a + i * Math.sin(p + l);
              t.lineTo(m, p);
            }
          t.closePath(), t.stroke(), e && t.fill(), (t.lineJoin = "round");
        })(d, m, w, (u / p.size) * p.realSize, p.shape, l),
        f.turrets.length !== p.turrets.length)
      )
        throw new Error("Mismatch turret number with mockup.");
      for (let e = 0; e < p.turrets.length; e++) {
        var P,
          T,
          F = p.turrets[e];
        1 === F.layer &&
          ((P = F.direction + F.angle + l),
          (T = F.offset * u),
          ze(
            m + T * Math.cos(P),
            w + T * Math.sin(P),
            F,
            a,
            1,
            (u / a / F.size) * F.sizeFactor,
            f.turrets[e].lerpedFacing + o * l,
            o,
            d,
            f.turrets[e],
            h
          ));
      }
      0 == s &&
        d != Ie &&
        0 < d.canvas.width &&
        0 < d.canvas.height &&
        (Ie.save(),
        (Ie.globalAlpha = i * g),
        (Ie.imageSmoothingEnabled = !1),
        Ie.drawImage(d.canvas, e - m, t - w),
        Ie.restore());
    }
  };
  (window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {}),
    (window.cancelAnimFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame);
  const u = (() => {
      const se = o(0, 0, 0, 0.05),
        ce = o(0, 0, 0, 0.05);
      function e() {
        var h = [];
        return (e, t, r, a, i, n) => {
          for (h.push(e); h.length > a; ) h.splice(0, 1);
          var l,
            e = Math.min(...h),
            o = Math.max(...h),
            s = o - e;
          0 < o && e < 0 && Ce(t, t + a, r + (i * o) / s, 2, be.guiwhite),
            Ie.beginPath();
          let c = -1;
          for (l of h)
            ++c
              ? Ie.lineTo(t + c, r + (i * (o - l)) / s)
              : Ie.moveTo(t, r + (i * (o - l)) / s);
          (Ie.lineWidth = 1), (Ie.strokeStyle = n), Ie.stroke();
        };
      }
      const he = () => {
          let o = 0,
            s = 0,
            c = 0;
          return {
            set: (e = fe.player.time, t = fe.metrics.rendergap) => {
              1e3 <
                (o =
                  150 < (o = Math.max(Me() - e - 80, -t)) && o < 1e3
                    ? 150
                    : o) && (o = (1e6 * Math.sin(o / 1e3 - 1)) / o + 1e3),
                (s = o / t),
                (c = (30 * ye.roomSpeed * o) / 1e3);
            },
            predict: (e, t, r, a) => {
              return 0 <= o
                ? ((i = e), (n = t), c, (l = s), n + (n - i) * l)
                : ((n = e),
                  (i = t),
                  (l = r),
                  (e = a),
                  c,
                  (t = s),
                  (r = Math.cos((1 + t) * Math.PI)),
                  0.5 * (((1 + t) * l + n) * (r + 1) + (-t * e + i) * (1 - r)));
              var i, n, l;
            },
            predictFacing: (e, t) => {
              return (
                e +
                (1 + s) *
                  ((t = (t = t) - (e = e) + Math.PI),
                  (e = 2 * Math.PI),
                  (((t % e) + e) % e) - Math.PI)
              );
            },
            getPrediction: () => o,
          };
        },
        de = e(),
        ge = e(),
        ue = e(),
        pe = (() => {
          let t = [];
          for (let e = 0; e < 2 * ye.gui.expectedMaxSkillLevel; e++)
            t.push(
              ((r = e / ye.gui.expectedMaxSkillLevel),
              Math.log(4 * r + 1) / Math.log(5))
            );
          var r;
          return (e) => t[e];
        })(),
        me = {
          skillNames: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          skillKeys: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          skillValues: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          skillPoints: Fe(),
          score: Fe(),
          name: Fe(),
          class: Fe(),
          debug: [Fe(), Fe(), Fe(), Fe(), Fe(), Fe(), Fe()],
          lbtitle: Fe(),
          leaderboard: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          upgradeNames: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          upgradeKeys: [
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
            Fe(),
          ],
          skipUpgrades: Fe(),
        };
      return (i, z) => {
        var n, l, t, e, r, a, o, s, c, h, d;
        Ae++;
        {
          let e = he();
          e.set();
          var m = e.getPrediction();
          (fe.player.renderx = we.lerp(
            fe.player.renderx,
            fe.player.cx,
            0.1,
            !0
          )),
            (fe.player.rendery = we.lerp(
              fe.player.rendery,
              fe.player.cy,
              0.1,
              !0
            )),
            (n = i * fe.player.renderx),
            (l = i * fe.player.rendery);
        }
        {
          Pe(be.white, 1), Pe(be.guiblack, 0.1);
          let t = fe.roomSetup[0].length,
            r = fe.roomSetup.length,
            a = 0;
          for (var N of fe.roomSetup) {
            let e = 0;
            for (var j of N) {
              var g = Math.max(
                  0,
                  (i * e * fe.gameWidth) / t - n + fe.screenWidth / 2
                ),
                u = Math.max(
                  0,
                  (i * a * fe.gameHeight) / r - l + fe.screenHeight / 2
                ),
                R = Math.min(
                  fe.screenWidth,
                  (i * (e + 1) * fe.gameWidth) / t - n + fe.screenWidth / 2
                ),
                U = Math.min(
                  fe.screenHeight,
                  (i * (a + 1) * fe.gameHeight) / r - l + fe.screenHeight / 2
                );
              (Ie.globalAlpha = 1),
                (Ie.fillStyle = ye.graphical.screenshotMode
                  ? be.guiwhite
                  : be.white),
                Ie.fillRect(g, u, R - g, U - u),
                (Ie.globalAlpha = 0.3),
                (Ie.fillStyle = ye.graphical.screenshotMode
                  ? be.guiwhite
                  : We(j, !0)),
                Ie.fillRect(g, u, R - g, U - u),
                e++;
            }
            a++;
          }
          (Ie.lineWidth = 1),
            (Ie.strokeStyle = ye.graphical.screenshotMode
              ? be.guiwhite
              : be.guiblack),
            (Ie.globalAlpha = 0.04),
            Ie.beginPath();
          var p = 30 * i;
          for (let e = (fe.screenWidth / 2 - n) % p; e < fe.screenWidth; e += p)
            Ie.moveTo(e, 0), Ie.lineTo(e, fe.screenHeight);
          for (
            let e = (fe.screenHeight / 2 - l) % p;
            e < fe.screenHeight;
            e += p
          )
            Ie.moveTo(0, e), Ie.lineTo(fe.screenWidth, e);
          Ie.stroke(), (Ie.globalAlpha = 1);
        }
        for (t of fe.entities)
          if (t.render.draws) {
            let e = he();
            1 === t.render.status.getFade()
              ? e.set()
              : e.set(t.render.lastRender, t.render.interval),
              (t.render.x = we.lerp(
                t.render.x,
                Math.round(t.x + t.vx),
                0.1,
                !0
              )),
              (t.render.y = we.lerp(
                t.render.y,
                Math.round(t.y + t.vy),
                0.1,
                !0
              )),
              (t.render.f =
                t.id !== ke.playerid || t.twiggle || fe.died
                  ? we.lerpAngle(t.render.f, t.facing, 0.15, !0)
                  : Math.atan2(fe.target.y, fe.target.x));
            var K = t.id === ke.playerid ? 0 : i * t.render.x - n,
              _ = t.id === ke.playerid ? 0 : i * t.render.y - l;
            (K += fe.screenWidth / 2),
              (_ += fe.screenHeight / 2),
              ze(
                K,
                _,
                t,
                i,
                t.id === ke.playerid || fe.showInvisible
                  ? t.alpha
                    ? 0.6 * t.alpha + 0.4
                    : 0.25
                  : t.alpha,
                1.1,
                t.render.f
              );
          }
        if (!ye.graphical.screenshotMode)
          for (var w of fe.entities) {
            var f = w.id === ke.playerid ? 0 : i * w.render.x - n,
              y = w.id === ke.playerid ? 0 : i * w.render.y - l;
            (f += fe.screenWidth / 2),
              (y += fe.screenHeight / 2),
              (f = f),
              (y = y),
              (e = w),
              (r = i),
              (w = w.alpha),
              (d = h = c = s = o = a = void 0),
              (h = e.render.status.getFade()),
              (Ie.globalAlpha = h * h),
              (r = e.size * r),
              (d = fe.mockups[e.index]),
              (d = (r / d.size) * d.realSize),
              e.drawsHealth &&
                ((c = e.render.health.get()),
                (a = e.render.shield.get()),
                (c < 1 || a < 1) &&
                  ((o = ye.graphical.coloredHealthbars
                    ? xe(Se(e.color), be.guiwhite, 0.5)
                    : be.lgreen),
                  (s = y + 1.1 * d + 15),
                  (Ie.globalAlpha = w * w * h),
                  Ce(f - r, f + r, s, 3 + ye.graphical.barChunk, be.black),
                  Ce(f - r, f - r + 2 * r * c, s, 3, o),
                  a &&
                    ((Ie.globalAlpha = (0.3 + 0.3 * a) * w * w * h),
                    Ce(
                      f - r,
                      f - r + 2 * r * a,
                      s,
                      3,
                      ye.graphical.coloredHealthbars
                        ? xe(o, be.guiblack, 0.25)
                        : be.teal
                    ),
                    (Ie.globalAlpha = 1)))),
              e.id !== ke.playerid &&
                e.nameplate &&
                (null == e.render.textobjs &&
                  (e.render.textobjs = [Fe(), Fe()]),
                (c = e.name.substring(7, e.name.length + 1)),
                (h = e.name.substring(0, 7)),
                (Ie.globalAlpha = w),
                e.render.textobjs[0].draw(c, f, y - d - 30, 16, h, "center"),
                e.render.textobjs[1].draw(
                  we.handleLargeNumber(e.score, 1),
                  f,
                  y - d - 16,
                  8,
                  h,
                  "center"
                ),
                (Ie.globalAlpha = 1));
          }
        i = we.getScreenRatio();
        (k = i),
          (b = !0),
          (fe.screenWidth /= k),
          (fe.screenHeight /= k),
          Ie.scale(k, k),
          b || (i *= k);
        var b = 200 / i,
          k = (ke.__s.update(), ve.get()),
          v = k.max;
        do {
          if (!fe.showTree) break;
          fe.died && ((fe.showTree = !1), (fe.scrollX = fe.realScrollX = 0)),
            (fe.scrollX = we.lerp(fe.scrollX, fe.realScrollX, 0.1));
          var D,
            q,
            M = fe.mockups.find((e) => "Basic" === e.name);
          if (!M) {
            console.log("No basic");
            break;
          }
          let r = [],
            s = [],
            c = (i, n, e, { index: t, tier: l = 0 }) => {
              r.push({ x: i, y: n, colorIndex: e, index: t });
              let o = fe.mockups[t]["upgrades"];
              switch (l) {
                case 3:
                  return { width: 1, height: 1 };
                case 2:
                  return (
                    o.forEach((e, t) => c(i, n + 2 + t, t, e)),
                    s.push([
                      { x: i, y: n },
                      { x: i, y: n + 1 + o.length },
                    ]),
                    { width: 1, height: 2 + o.length }
                  );
                case 1:
                case 0: {
                  let a = i,
                    e = o.map((e, t) => {
                      var r = 2 * (e.tier - l),
                        e = c(i, n + r, t, e);
                      return (
                        s.push([
                          { x: i, y: n + (0 === t ? 0 : 1) },
                          { x: i, y: n + r },
                        ]),
                        t + 1 === o.length &&
                          s.push([
                            { x: a, y: n + 1 },
                            { x: i, y: n + 1 },
                          ]),
                        (i += e.width),
                        e
                      );
                    });
                  return {
                    width: e.map((e) => e.width).reduce((e, t) => e + t, 0),
                    height: 2 + Math.max(...e.map((e) => e.height)),
                  };
                }
              }
            },
            e = c(0, 0, 0, { index: M.index }),
            t = +Math.min(
              ((0.9 * fe.screenWidth) / e.width) * 55,
              (0.9 * fe.screenHeight) / e.height
            ),
            a = t - 4;
          for ([D, q] of s) {
            var X =
                fe.screenWidth / 2 +
                (D.x - e.width * fe.scrollX) * t +
                1 +
                0.5 * a,
              $ = fe.screenHeight / 2 + (D.y - e.height / 2) * t + 1 + 0.5 * a,
              J =
                fe.screenWidth / 2 +
                (q.x - e.width * fe.scrollX) * t +
                1 +
                0.5 * a,
              O = fe.screenHeight / 2 + (q.y - e.height / 2) * t + 1 + 0.5 * a;
            (Ie.strokeStyle = be.black), (Ie.lineWidth = 2), Le(X, $, J, O);
          }
          (Ie.globalAlpha = 0.5),
            (Ie.fillStyle = be.guiwhite),
            Ie.fillRect(0, 0, innerWidth, innerHeight);
          var V,
            Y,
            G,
            Q,
            M =
              "Use the arrow keys to navigate the class tree. Press T again to close it.",
            Z = ((Ie.font = "20px Ubuntu"), Ie.measureText(M).width);
          (Ie.globalAlpha = 1),
            (Ie.lineWidth = 1),
            (Ie.fillStyle = be.red),
            (Ie.strokeStyle = be.black),
            Ie.fillText(M, innerWidth / 2 - Z / 2, 0.04 * innerHeight),
            Ie.strokeText(M, innerWidth / 2 - Z / 2, 0.04 * innerHeight),
            (Ie.globalAlpha = 1);
          for ({ x: V, y: Y, colorIndex: G, index: Q } of r) {
            var x,
              ee,
              te,
              re,
              S,
              W = fe.screenWidth / 2 + (V - e.width * fe.scrollX) * t,
              H = fe.screenHeight / 2 + (Y - e.height / 2) * t,
              A = t;
            W < -50 ||
              W + A - 50 > fe.screenWidth ||
              ((Ie.globalAlpha = 0.75),
              (Ie.fillStyle = Se(10)),
              Be(W, H, A, A),
              (Ie.globalAlpha = 0.15),
              (Ie.fillStyle = Se(0)),
              Be(W, H, A, 0.6 * A),
              (Ie.fillStyle = be.black),
              Be(W, H + 0.6 * A, A, 0.4 * A),
              (Ie.globalAlpha = 1),
              (x = -Math.PI / 4),
              (ee = we.getEntityImageFromMockup(Q, 10)),
              (re =
                W +
                0.5 * A -
                (te = (0.8 * A) / (S = fe.mockups[Q].position).axis) *
                  S.middle.x *
                  Math.cos(x)),
              (S = H + 0.5 * A - te * S.middle.x * Math.sin(x)),
              ze(re, S, ee, 0.5, 1, (te / ee.size) * 2, x, !0),
              (Ie.strokeStyle = be.black),
              (Ie.globalAlpha = 1),
              (Ie.lineWidth = 2),
              Be(W, H, A, A, !0));
          }
        } while (0);
        {
          if (fe.showTree) return;
          var ae = fe.screenWidth / 2;
          let i = 20;
          for (let a = fe.messages.length - 1; 0 <= a; a--) {
            let e = fe.messages[a],
              t = e.text,
              r = t;
            null == e.textobj && (e.textobj = Fe()),
              null == e.len && (e.len = Te(r, 14)),
              (Ie.globalAlpha = 0.5 * e.alpha),
              Ce(ae - e.len / 2, ae + e.len / 2, i + 9, 18, be.black),
              (Ie.globalAlpha = Math.min(1, e.alpha)),
              e.textobj.draw(r, ae, i + 9, 14, be.guiwhite, "center", !0),
              (i += 22),
              1 < e.status && (i -= 22 * (1 - Math.sqrt(e.alpha))),
              1 < e.status
                ? ((e.status -= 0.05), (e.alpha += 0.05))
                : 0 === a &&
                  (5 < fe.messages.length || 1e4 < Date.now() - e.time) &&
                  ((e.status -= 0.05),
                  (e.alpha -= 0.05),
                  e.alpha <= 0 &&
                    (fe.messages[0].textobj.remove(),
                    fe.messages.splice(0, 1)));
          }
          Ie.globalAlpha = 1;
        }
        {
          if (fe.showTree) return;
          (fe.canSkill = !!ke.points),
            se.set(0 + (fe.canSkill || fe.died || fe.statHover)),
            fe.clickables.stat.hide();
          let s = b,
            c = s,
            h = -20 - 2 * s + se.get() * (40 + 2 * s),
            d = fe.screenHeight - 20 - 15,
            g = 11,
            e = ke.getStatNames(fe.mockups[ke.type].statnames || -1);
          ke.skills.forEach(function (a) {
            g--;
            var i = e[g - 1],
              n = a.amount,
              l = be[a.color],
              o = a.softcap,
              a = a.cap;
            if (o) {
              s = c;
              let t = ye.gui.expectedMaxSkillLevel,
                e = o > t,
                r = o < a;
              if (
                (e && (t = o),
                Ce(
                  7.5 + h,
                  h - 7.5 + s * pe(o),
                  d + 7.5,
                  12 + ye.graphical.barChunk,
                  be.black
                ),
                Ce(7.5 + h, 7.5 + h + (s - 35) * pe(o), d + 7.5, 12, be.grey),
                Ce(7.5 + h, 7.5 + h + (s - 35) * pe(n), d + 7.5, 11.5, l),
                r)
              ) {
                (Ie.lineWidth = 1), (Ie.strokeStyle = be.grey);
                for (let e = o + 1; e < t; e++)
                  Le(
                    h + (s - 35) * pe(e),
                    d + 1.5,
                    h + (s - 35) * pe(e),
                    d - 3 + 15
                  );
              }
              Ie.strokeStyle = be.black;
              for (let e = (Ie.lineWidth = 1); e < n + 1; e++)
                Le(
                  h + (s - 35) * pe(e),
                  d + 1.5,
                  h + (s - 35) * pe(e),
                  d - 3 + 15
                );
              s = c * pe(t);
              a =
                n == a
                  ? l
                  : !ke.points || (o !== a && n == o)
                  ? be.grey
                  : be.guiwhite;
              me.skillNames[g - 1].draw(
                i,
                Math.round(h + s / 2) + 0.5,
                d + 7.5,
                10,
                a,
                "center",
                !0
              ),
                me.skillKeys[g - 1].draw(
                  "[" + (g % 10) + "]",
                  Math.round(h + s - 3.75) - 1.5,
                  d + 7.5,
                  10,
                  a,
                  "right",
                  !0
                ),
                a === be.guiwhite &&
                  fe.clickables.stat.place(g - 1, h, d, s, 15),
                n &&
                  me.skillValues[g - 1].draw(
                    a === l ? "MAX" : "+" + n,
                    Math.round(h + s + 4) + 0.5,
                    d + 7.5,
                    10,
                    l,
                    "left",
                    !0
                  ),
                (d -= 19);
            }
          }),
            fe.clickables.hover.place(
              0,
              0,
              d,
              0.8 * s,
              0.8 * (fe.screenHeight - d)
            ),
            0 !== ke.points &&
              me.skillPoints.draw(
                "x" + ke.points,
                Math.round(h + s - 2) + 0.5,
                Math.round(d + 15 - 4) + 0.5,
                20,
                be.guiwhite,
                "right"
              );
        }
        if (!fe.showTree) {
          var k = 1.65 * b,
            I = (fe.screenWidth - k) / 2,
            P = fe.screenHeight - 20 - 25;
          (Ie.lineWidth = 1),
            Ce(I, I + k, 12.5 + P, 22 + ye.graphical.barChunk, be.black),
            Ce(I, I + k, 12.5 + P, 22, be.grey),
            Ce(I, I + k * ke.__s.getProgress(), 12.5 + P, 21.5, be.gold),
            me.class.draw(
              "Level " + ke.__s.getLevel() + " " + fe.mockups[ke.type].name,
              I + k / 2,
              12.5 + P,
              21,
              be.guiwhite,
              "center",
              !0
            ),
            Ce(
              I + 0.1 * k,
              I + 0.9 * k,
              7 + (P -= 18),
              11 + ye.graphical.barChunk,
              be.black
            ),
            Ce(I + 0.1 * k, I + 0.9 * k, 7 + P, 11, be.grey),
            Ce(
              I + 0.1 * k,
              I +
                k * (0.1 + 0.8 * (v ? Math.min(1, ke.__s.getScore() / v) : 1)),
              7 + P,
              10.5,
              be.green
            ),
            me.score.draw(
              "Score: " + we.handleLargeNumber(ke.__s.getScore()),
              I + k / 2,
              7 + P,
              12,
              be.guiwhite,
              "center",
              !0
            ),
            (Ie.lineWidth = 4),
            me.name.draw(
              fe.player.name,
              Math.round(I + k / 2) + 0.5,
              Math.round(P - 10 - 4) + 0.5,
              32,
              fe.nameColor,
              "center"
            );
          {
            if (fe.showTree) return;
            let a = b,
              i = (a / fe.gameWidth) * fe.gameHeight;
            if (fe.gameHeight > fe.gameWidth || fe.gameHeight < fe.gameWidth) {
              let e = [
                fe.gameWidth / fe.gameHeight,
                fe.gameHeight / fe.gameWidth,
              ];
              (a /= 1.5 * e[1]),
                (i /= 1.5 * e[1]),
                (e = a > 2 * b ? a / (2 * b) : i > 2 * b ? i / (2 * b) : 1),
                (a /= e),
                (i /= e);
            }
            var T,
              F = fe.screenWidth - 20 - a;
            let n = fe.screenHeight - i - 20,
              l = ((Ie.globalAlpha = 0.4), fe.roomSetup[0].length),
              o = fe.roomSetup.length,
              s = 0;
            for (let r = 0; r < o; r++) {
              fe.roomSetup[r];
              let t = 0;
              for (let e = 0; e < l; e++) {
                var ie = fe.roomSetup[r][e];
                (Ie.fillStyle = We(ie)),
                  We(ie) !== be.white &&
                    Be(F + (t * a) / l, n + (s * i) / o, a / l, i / o),
                  t++;
              }
              s++;
            }
            (Ie.fillStyle = be.white), Be(F, n, a, i);
            for (T of Ne.get())
              switch (
                ((Ie.fillStyle = xe(Se(T.color), be.black, 0.3)),
                (Ie.globalAlpha = T.alpha),
                T.type)
              ) {
                case 2:
                  Be(
                    F + ((T.x - T.size) / fe.gameWidth) * a - 0.4,
                    n + ((T.y - T.size) / fe.gameHeight) * i - 1,
                    ((2 * T.size) / fe.gameWidth) * a + 0.2,
                    ((2 * T.size) / fe.gameWidth) * a + 0.2
                  );
                  break;
                case 1:
                  Ee(
                    F + (T.x / fe.gameWidth) * a,
                    n + (T.y / fe.gameHeight) * i,
                    (T.size / fe.gameWidth) * a + 0.2
                  );
                  break;
                case 0:
                  T.id !== ke.playerid &&
                    Ee(
                      F + (T.x / fe.gameWidth) * a,
                      n + (T.y / fe.gameHeight) * i,
                      2
                    );
              }
            (Ie.globalAlpha = 1),
              (Ie.lineWidth = 1),
              (Ie.strokeStyle = be.black),
              (Ie.fillStyle = be.black),
              Ee(
                F + (fe.player.cx / fe.gameWidth) * a - 1,
                n + (fe.player.cy / fe.gameHeight) * i - 1,
                2,
                !1
              ),
              (Ie.lineWidth = 3),
              (Ie.fillStyle = be.black),
              Be(F, n, a, i, !0),
              fe.showDebug &&
                (Be(F, n - 40, a, 30),
                ge(je.get(), F, n - 40, a, 30, be.teal),
                ue(fe.metrics.rendergap, F, n - 40, a, 30, be.pink),
                de(m, F, n - 40, a, 30, be.yellow)),
              fe.showDebug || (n += 42),
              fe.showDebug
                ? (me.debug[5].draw(
                    "arras.io",
                    F + a,
                    n - 50 - 70 - 2,
                    15,
                    "#B6E57C",
                    "right"
                  ),
                  me.debug[4].draw(
                    "Prediction: " + Math.round(m) + "ms",
                    F + a,
                    n - 50 - 56,
                    10,
                    be.guiwhite,
                    "right"
                  ),
                  me.debug[3].draw(
                    `Bandwidth: ${ke.bandwidth.in} in, ${ke.bandwidth.out} out`,
                    F + a,
                    n - 50 - 42,
                    10,
                    be.guiwhite,
                    "right"
                  ),
                  me.debug[2].draw(
                    "Update Rate: " + fe.metrics.updatetime + "Hz",
                    F + a,
                    n - 50 - 28,
                    10,
                    be.guiwhite,
                    "right"
                  ),
                  me.debug[1].draw(
                    (100 * ke.fps).toFixed(2) +
                      "% : " +
                      fe.metrics.rendertime +
                      " FPS",
                    F + a,
                    n - 50 - 14,
                    10,
                    10 < fe.metrics.rendertime ? be.guiwhite : be.orange,
                    "right"
                  ),
                  me.debug[0].draw(
                    fe.metrics.latency + " ms - " + fe.serverName,
                    F + a,
                    n - 50,
                    10,
                    be.guiwhite,
                    "right"
                  ))
                : (me.debug[2].draw(
                    "arras.io",
                    F + a,
                    n - 50 - 28 - 2,
                    15,
                    "#B6E57C",
                    "right"
                  ),
                  me.debug[1].draw(
                    (100 * ke.fps).toFixed(2) +
                      "% : " +
                      fe.metrics.rendertime +
                      " FPS",
                    F + a,
                    n - 50 - 14,
                    10,
                    10 < fe.metrics.rendertime ? be.guiwhite : be.orange,
                    "right"
                  ),
                  me.debug[0].draw(
                    fe.metrics.latency +
                      " ms : " +
                      fe.metrics.updatetime +
                      "Hz",
                    F + a,
                    n - 50,
                    10,
                    be.guiwhite,
                    "right"
                  )),
              (fe.fps = fe.metrics.rendertime);
          }
          {
            if (fe.showTree) return;
            var ne = ve.get(),
              B = b,
              E = fe.screenWidth - B - 20;
            let t = 41;
            me.lbtitle.draw(
              "Leaderboard:",
              Math.round(E + B / 2) + 0.5,
              Math.round(t - 6) + 0.5,
              18,
              be.guiwhite,
              "center"
            );
            for (let e = 0; e < ne.data.length; e++) {
              var L = ne.data[e],
                C =
                  (Ce(E, E + B, t + 7, 11 + ye.graphical.barChunk, be.black),
                  Ce(E, E + B, t + 7, 11, be.grey),
                  Math.min(1, L.score / v)),
                C =
                  (Ce(E, E + B * C, t + 7, 10.5, Se(L.barColor)),
                  L.nameColor || "#FFFFFF"),
                C =
                  (me.leaderboard[e].draw(
                    L.label +
                      (": " + we.handleLargeNumber(Math.round(L.score))),
                    E + B / 2,
                    t + 7,
                    9,
                    C,
                    "center",
                    !0
                  ),
                  14 / L.position.axis),
                le = E - 21 - C * L.position.middle.x * 0.707,
                oe = t + 7 + C * L.position.middle.x * 0.707;
              ze(
                le,
                oe,
                L.image,
                1 / C,
                1,
                (C * C) / L.image.size,
                -Math.PI / 4,
                !0
              ),
                (t += 18);
            }
          }
          {
            if (fe.showTree) return;
            ce.set(0 + (fe.canUpgrade || fe.upgradeHover));
            let p = ce.get();
            if ((fe.clickables.upgrade.hide(), 0 < ke.upgrades.length)) {
              fe.canUpgrade = !0;
              let i = b / 2,
                n = i,
                l = 2 * p * 20 - 20,
                o = 20,
                s = l;
              I = l;
              let c = 0,
                h = o,
                d = 0,
                g = ((He += 0.01), 10),
                u = 0;
              ke.upgrades.forEach(function (e) {
                o > h && (h = o),
                  (c = l),
                  fe.clickables.upgrade.place(u++, l, o, i, n),
                  (Ie.globalAlpha = 0.5),
                  (Ie.fillStyle = Se(15 < g ? g - 16 : g)),
                  Be(l, o, i, n),
                  (Ie.globalAlpha = 0.1),
                  (Ie.fillStyle = Se(g++ - 10)),
                  Be(l, o, i, 0.6 * n),
                  (Ie.fillStyle = be.black),
                  Be(l, o + 0.6 * n, i, 0.4 * n),
                  (Ie.globalAlpha = 1);
                var t = we.getEntityImageFromMockup(e, ke.color),
                  e = fe.mockups[e].position,
                  r = (0.6 * i) / e.axis,
                  a = l + 0.5 * i - r * e.middle.x * Math.cos(He),
                  e = o + 0.5 * n - r * e.middle.x * Math.sin(He);
                ze(a, e, t, 1, 1, r / t.size, He, !0),
                  me.upgradeNames[u - 1].draw(
                    t.name,
                    l + (0.9 * i) / 2,
                    o + n - 6,
                    n / 8 - 3,
                    be.guiwhite,
                    "center"
                  ),
                  me.upgradeKeys[u - 1].draw(
                    "[" +
                      (function (e) {
                        switch (e) {
                          case 0:
                            return "y";
                          case 1:
                            return "h";
                          case 2:
                            return "u";
                          case 3:
                            return "j";
                          case 4:
                            return "i";
                          case 5:
                            return "k";
                          case 6:
                            return "o";
                          case 7:
                            return "l";
                          default:
                            return "N/A";
                        }
                      })(d) +
                      "]",
                    l + i - 4,
                    o + n - 6,
                    n / 8 - 3,
                    be.guiwhite,
                    "right"
                  ),
                  (Ie.strokeStyle = be.black),
                  (Ie.globalAlpha = 1),
                  (Ie.lineWidth = 3),
                  Be(l, o, i, n, !0),
                  ++d % 3 == 0 ? ((l = s), (o += 8 + n)) : (l += p * (8 + i));
              });
              (k = "Don't Upgrade"),
                (P = Te(k, 11) + 10),
                (m = I + (c + i + 8 - I) / 2),
                (b = h + n + 8);
              Ce(
                m - P / 2,
                m + P / 2,
                b + 7,
                14 + ye.graphical.barChunk,
                be.black
              ),
                Ce(m - P / 2, m + P / 2, b + 7, 14, be.white),
                me.skipUpgrades.draw(
                  k,
                  m,
                  b + 7,
                  12,
                  be.guiwhite,
                  "center",
                  !0
                ),
                fe.clickables.skipUpgrades.place(0, m - P / 2, b, P, 14);
            } else
              (fe.canUpgrade = !1),
                fe.clickables.upgrade.hide(),
                fe.clickables.skipUpgrades.hide();
          }
          fe.metrics.lastrender = Me();
        }
      };
    })(),
    p = (() => {
      let s = {
        taunt: Fe(),
        level: Fe(),
        score: Fe(),
        time: Fe(),
        kills: Fe(),
        death: Fe(),
        playagain: Fe(),
      };
      return () => {
        Pe(be.black, 0.25);
        let e = we.getScreenRatio();
        (r = e),
          (t = !0),
          (fe.screenWidth /= r),
          (fe.screenHeight /= r),
          Ie.scale(r, r),
          t || (e *= r);
        var t = c.deathScreen.get(),
          r = (Ie.translate(0, -t * fe.screenHeight), fe.screenWidth / 2),
          a = fe.screenHeight / 2 - 50,
          i = we.getEntityImageFromMockup(ke.type, ke.color),
          n = fe.mockups[ke.type].position,
          l = 140 / n.axis,
          o = fe.screenWidth / 2 - l * n.middle.x * 0.707,
          n = fe.screenHeight / 2 - 35 + l * n.middle.x * 0.707;
        ze(
          (o - 190 - 70 + 0.5) | 0,
          (n - 10 + 0.5) | 0,
          i,
          1.5,
          1,
          (0.5 * l) / i.realSize,
          -Math.PI / 4,
          !0
        ),
          s.taunt.draw(
            "If you think you have a record, submit it using the link on the start menu. Make sure you have a screenshot.",
            r,
            a - 80,
            8,
            be.guiwhite,
            "center"
          ),
          s.level.draw(
            "Level " + ke.__s.getLevel() + " " + fe.mockups[ke.type].name + ".",
            r - 170,
            a - 30,
            24,
            be.guiwhite
          ),
          s.score.draw(
            "Final score: " +
              we.formatLargeNumber(Math.round(fe.finalScore.get())),
            r - 170,
            25 + a,
            50,
            be.guiwhite
          ),
          s.time.draw(
            "⌚ Survived for " +
              we.timeForHumans(Math.round(fe.finalLifetime.get())) +
              ".",
            r - 170,
            55 + a,
            16,
            be.guiwhite
          ),
          s.kills.draw(
            ((o = [
              Math.round(fe.finalKills[0].get()),
              Math.round(fe.finalKills[1].get()),
              Math.round(fe.finalKills[2].get()),
            ]),
            (0 === (n = o[0] + 0.5 * o[1] + 3 * o[2])
              ? "🌼"
              : n < 4
              ? "🎯"
              : n < 8
              ? "💥"
              : n < 15
              ? "💢"
              : n < 25
              ? "🔥"
              : n < 50
              ? "💣"
              : n < 75
              ? "👺"
              : n < 100
              ? "🌶️"
              : "💯") +
              (o[0] || o[1] || o[2]
                ? " " +
                  (o[0] ? o[0] + " kills" : "") +
                  (o[0] && o[1] ? " and " : "") +
                  (o[1] ? o[1] + " assists" : "") +
                  ((o[0] || o[1]) && o[2] ? " and " : "") +
                  (o[2] ? o[2] + " visitors defeated" : "")
                : " A true pacifist") +
              "."),
            r - 170,
            77 + a,
            16,
            be.guiwhite
          ),
          s.death.draw(
            (() => {
              let t = "";
              return (
                fe.finalKillers.length
                  ? ((t = "🔪 Succumbed to"),
                    fe.finalKillers.forEach((e) => {
                      t += " " + we.addArticle(fe.mockups[e].name) + " and";
                    }),
                    (t = t.slice(0, -4) + "."))
                  : (t += "🤷 Well that was kinda dumb huh"),
                t
              );
            })(),
            r - 170,
            99 + a,
            16,
            be.guiwhite
          ),
          s.playagain.draw(
            "Press enter to play again!",
            r,
            125 + a,
            16,
            be.guiwhite,
            "center"
          ),
          Ie.translate(0, t * fe.screenHeight);
      };
    })(),
    m = (() => {
      let a = { connecting: Fe(), message: Fe() };
      return () => {
        let e = we.getScreenRatio();
        (t = e),
          (r = !0),
          (fe.screenWidth /= t),
          (fe.screenHeight /= t),
          Ie.scale(t, t),
          r || (e *= t),
          Pe(be.white, 0.5);
        var t,
          r = c.connecting.get();
        Ie.translate(0, -r * fe.screenHeight),
          a.connecting.draw(
            "Connecting...",
            fe.screenWidth / 2,
            fe.screenHeight / 2,
            30,
            be.guiwhite,
            "center"
          ),
          a.message.draw(
            fe.message,
            fe.screenWidth / 2,
            fe.screenHeight / 2 + 30,
            15,
            be.lgreen,
            "center"
          ),
          Ie.translate(0, r * fe.screenHeight);
      };
    })(),
    w = (() => {
      let a = { disconnected: Fe(), message: Fe() };
      return () => {
        let e = we.getScreenRatio();
        (t = e),
          (r = !0),
          (fe.screenWidth /= t),
          (fe.screenHeight /= t),
          Ie.scale(t, t),
          r || (e *= t),
          Pe(xe(be.red, be.guiblack, 0.3), 0.25);
        var t,
          r = c.disconnected.get();
        Ie.translate(0, -r * fe.screenHeight),
          a.disconnected.draw(
            "💀 Disconnected. 💀",
            fe.screenWidth / 2,
            fe.screenHeight / 2,
            30,
            be.guiwhite,
            "center"
          ),
          a.message.draw(
            fe.message,
            fe.screenWidth / 2,
            fe.screenHeight / 2 + 30,
            15,
            be.orange,
            "center"
          ),
          Ie.translate(0, r * fe.screenHeight);
      };
    })();
  function d() {
    (fe.animLoopHandle = window.requestAnimFrame(d)),
      (fe.player.renderv += (fe.player.view - fe.player.renderv) / 30);
    var e = ye.graphical.screenshotMode ? 2 : we.getRatio();
    (Ie.lineCap = "round"),
      (Ie.lineJoin = "round"),
      fe.gameStart &&
        !fe.disconnected &&
        ((fe.time = Me()),
        1e3 < fe.time - i &&
          (fe.socket.ping(fe.time),
          (i = fe.time),
          (fe.metrics.rendertime = Ae),
          (Ae = 0),
          (fe.metrics.updatetime = fe.updateTimes),
          (fe.updateTimes = 0)),
        (fe.metrics.lag = fe.time - fe.player.time)),
      Ie.translate(0.5, 0.5),
      fe.gameStart ? u(e, we.getScreenRatio()) : fe.disconnected || m(),
      fe.died && p(),
      fe.disconnected && w(),
      Ie.translate(-0.5, -0.5);
  }
})(util, global, config, Canvas, color, socketStuff);
