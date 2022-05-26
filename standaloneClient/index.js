const [express, cors, expressMinify, fs, path, fetch] = ["express", "cors", "express-minify", "fs", "path", "node-fetch"].map(require);
const server = express();
let serverIPs = [{
    ok: false,
    ip: "localhost:3000"
}, {
    ok: false,
    secure: true,
    ip: "shine-glass-card.glitch.me"
}], servers = [];
//server.use(expressMinify());
server.use(cors());
server.use(express.static(path.join(__dirname, "../public")));
server.get("/serverData.json", function(request, response) {
    response.json({
        ok: true,
        ip: servers//"localhost:3000"
    });
});
server.listen(process.env.PORT || 5000, function() {
    console.log("Express + WS server listening on port", process.env.PORT || 5000);
});
function refreshServer(server) {
    fetch((server.secure ? "https" : "http") + "://" + server.ip + "/lib/json/gamemodeData.json").then(response => response.json()).then(json => {
        json.ip = server.ip;
        json.secure = !!server.secure;
        servers.push(json);
    }).catch((e) => {
        server.ok = false;
    });
}
serverIPs.forEach(refreshServer);
setInterval(() => {
    servers = [];
    serverIPs.forEach(refreshServer);
}, 15000);