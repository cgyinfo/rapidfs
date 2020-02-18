#!/usr/bin/env node

/********************************************************************
 * author: zhouxiaochuan <zhouxiaochuan@cgyinfo.com>
 ********************************************************************/

const redis = require('redis');

module.exports = {
    client: null,
    TIMEOUT30: 30 * 60, //30分钟超时

    connect(options) {
        return new Promise((resolve, reject) => {
            this.client = redis.createClient(options.port, options.host, { password: options.password });
            this.client.on('error', err => {
                if (err) {
                    reject(err);
                }
            });
            this.client.on('connect', err => {
                resolve();
            });
        });
    },

    // get
    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    // set
    set(key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    // set
    setex(key, seconds, value) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, seconds, value, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    // del
    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    // expire
    expire(key, seconds) {
        return new Promise((resolve, reject) => {
            this.client.expire(key, seconds, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
};