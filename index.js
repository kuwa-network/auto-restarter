const { spawn } = require('child_process');
const fs = require("fs");
const yaml = require("js-yaml");
let config = yaml.load(fs.readFileSync("./config.yml", "utf8"));
const log4js = require('log4js');
const logger = log4js.getLogger("[MAIN]");
logger.level = config.loggerLevel;

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

(async () => {
    while(1) {
        await sleep(config.configLoadInterval);
        config = yaml.load(fs.readFileSync("./config.yml", "utf8"));
        logger.debug("Load config FILE");
    }
})();

(async () => {
    while(1) {
        await new Promise(async (resolve, reject) => {
            const childProcess = spawn(config.cmd, config.arg, { cwd: config.cwd });
            logger.info(`Started child process with PID:${childProcess.pid} as PID:${process.pid}`);
            childProcess.stdout.on('data', (chunk) => {
                if(chunk.toString() != ""){
                    console.log(chunk.toString());
                }
            });
            childProcess.on("close", (code) => {
                logger.info(`Child process close all stdio with code.\n > ${code}`);
                resolve();
            });
            await sleep(config.restartInterval*1000*60);
            childProcess.kill();
            logger.info(`Stop child process with PID:${childProcess.pid} as PID:${process.pid}`);
            resolve()
        });
    }
})();

