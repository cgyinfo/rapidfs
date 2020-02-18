#!/usr/bin/env node

/********************************************************************
 * author: zhouxiaochuan <zhouxiaochuan@cgyinfo.com>
 ********************************************************************/

const config = require('./config');

/* eslint-disable no-console */
//console.log('CONFIG:\n%s', JSON.stringify(config, null, '  '));
/* eslint-enable no-console */

// logger
const log4js = require('log4js');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const ERR = require('./utils/errors');
const redis = require('./utils/redis');
const checktoken = require('./checktoken');

// express application.
// @type {Function}
let express_app = express();

// HTTP server.
// @type {http.Server}
let http_server;

// HTTPS server.
// @type {https.Server}
let https_server;

// Logger
let log;

// Main Program
run();

async function run() {
    log4js.configure(config.log);
    global.logger = log4js.getLogger('DEV');
    log = global.logger;

    log.info('server is starting...');

    await init_service().catch(err => {
        log.error(err.message);
        process.exit(1);
    });


    await redis_service();
    await express_service();
    await http_service();
    await https_service();
    log.info('server started successfully.');
}

/**
 * initialize service
 */
function init_service() {
    return new Promise((resolve, reject) => {
        fs.mkdir(config.storage.path, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * redis database service
 */
async function redis_service() {
    log.info('redis is connecting...');
    try {
        await redis.connect(config.redis);
    } catch (err) {
        log.info('redis connect failed: %s', err);
        process.exit(1);
    }
    log.info('redis connected.');
}

/**
 * express application for RESTFUL
 */
async function express_service() {
    log.info('express service is creating...');
    express_app.use(log4js.connectLogger(log, { level: 'debug' }));
    express_app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], optionsSuccessStatus: 200 }));
    express_app.get('/favicon.ico', (req, res) => res.status(204));

    express_app.use('/', checktoken);
    express_app.use(express.static(config.storage.path, { dotfiles: 'deny' }));
    express_app.use(bodyParser.json({ limit: '10mb' }));
    express_app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


    log.info('express service created.');
}

/**
 * http server service
 */
async function http_service() {
    log.info('http service is starting...');
    http_server = http.createServer(express_app);
    await new Promise((resolve) => {
        http_server.listen(config.http.listen.port, config.http.listen.ip, resolve);
    });
    log.info('http service is listening [%s:%d]...', config.http.listen.ip, config.http.listen.port);
}

/**
 * https server service
 */
async function https_service() {
    log.info('https service is starting...');
    https_server = https.createServer(config.https.options, express_app);
    await new Promise((resolve) => {
        https_server.listen(config.https.listen.port, config.https.listen.ip, resolve);
    });
    log.info('https service is listening [%s:%d]...', config.https.listen.ip, config.https.listen.port);
}

function createHashDirectory(uid) {
    let path = "";
    for (var i = 0; i < 3; i++) {
        let start = i * 2;
        let stop = start + 2;
        let subpath = uid.substring(start, stop);
        path += '/' + subpath;
    }
    let filePath = config.storage.path + path;
    return new Promise((resolve, reject) => {
        fs.mkdir(filePath, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(path);
            }
        });
    });
}

/**
 * /upload: {uid token files}
 */
express_app.post('/upload', fileUpload(), async function(req, res) {
    let { uid } = req.query || req.body || req.params;

    let files = req.files;
    if (!files || !files.file) {
        let result = { error: ERR.PARAMS, reason: '未上传文件' };
        return res.status(400).send(JSON.stringify(result));
    }

    let file = files.file;
    let filePath = await createHashDirectory(uid).catch(err => {
        let result = { error: ERR.SYSTEM, reason: '创建目录失败' };
        return res.status(500).send(JSON.stringify(result))
    });

    let fileFullName = config.storage.path + filePath + '/' + file.name;
    // Use the mv() method to place the file somewhere on your server
    file.mv(fileFullName, function(err) {
        if (err) {
            let result = { error: ERR.SYSTEM, reason: err };
            return res.status(500).send(JSON.stringify(result));
        }

        let result = { error: ERR.NONE, url: filePath + '/' + file.name + '?time=' + Date.now() };
        return res.status(200).send(JSON.stringify(result));
    });
});