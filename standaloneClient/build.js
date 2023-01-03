
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { promisify } = require('util');
const { resolve, join } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

const UglifyJS = require("uglify-js");
const { obfuscate } = require("javascript-obfuscator");

const minify = code => {
    if (process.argv[2] === "minify") {
        return UglifyJS.minify(code).code;
    } else if (process.argv[2] === "obfuscate") {
        return obfuscate(code).getObfuscatedCode();
    } else {
        return code;
    }
}

const root = join(__dirname + "/../public");
console.log(root);
getFiles(__dirname + "/../public").then(files => {
    files = files.map(r => r.split(root).pop());
    files.forEach(file => {
        const raw = fs.readFileSync(root + file, "utf-8");
        if (file.endsWith(".js")) {
            fs.writeFileSync(__dirname + "/latest_build" + file, minify(raw), "utf-8");
        } else {
            fs.writeFileSync(__dirname + "/latest_build" + file, raw, "utf-8");
        }
    });
});