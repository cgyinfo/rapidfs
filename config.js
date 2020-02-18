#!/usr/bin/env node

/********************************************************************
 * author: zhouxiaochuan <zhouxiaochuan@cgyinfo.com>
 ********************************************************************/
const fs = require('fs');
const os = require('os');

module.exports = {
    // HTTP server
    http: {
        listen: {
            ip: '0.0.0.0',
            port: 8878
        }
    },

    // HTTPS server
    https: {
        listen: {
            ip: '0.0.0.0',
            port: 8879
        },
        // set your own valid certificate files.
        options: {
            cert: fs.readFileSync(`${__dirname}/certs/server.crt`, 'utf8'),
            key: fs.readFileSync(`${__dirname}/certs/server.key`, 'utf8'),
            rejectUnauthorized: false,
            requestCert: false
        }
    },

    storage: {
        path: `${__dirname}/data`
    },

    // REDIS
    redis: {
        host: 'localhost',
        port: 6379,
        password: '123456'
    },

    // log4js configuration
    // level: trace, debug, info, warn, error, fatal
    log: {
        appenders: {
            console: { type: 'console' },
            file: { type: 'dateFile', filename: `${__dirname}/logs/rapidfs.log`, pattern: '.yyyy-MM-dd', keepFileExt: true },
        },
        categories: {
            default: { appenders: ['file'], level: 'info' },
            DEV: { appenders: ['console', 'file'], level: "debug" }
        }
    },

};