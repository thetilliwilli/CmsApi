"use strict";
console.log(`Attempt to start`);
//REQUIRE
const fs = require("fs");
const http = require("http");
const path = require("path");
//SETUP
const port = process.env["APP_PORT"] || 8888;
const backupPath = process.env["APP_BACKUP_PATH"] || "/opt/backup/mongodb";
//LOGIC
http.createServer((req,res)=>{
    console.log(`[Request]: ${(new Date()).toISOString()}`);
    var files = fs.readdirSync(backupPath);
    var absPath = path.join(backupPath, files[files.length-1]);
    var fileReadStream = fs.createReadStream(absPath);
    var str = res.str
    fileReadStream.pipe(res);
    console.log(`[Request] Finished`);
}).listen(port, ()=>{
    console.log(`Listening port ${port}`);
});