#!/usr/bin/env node

/********************************************************************
 * author: zhouxiaochuan <zhouxiaochuan@cgyinfo.com>
 ********************************************************************/

const ERR = require('./utils/errors')
const redis = require('./utils/redis')

exports = module.exports = async function(req, res, next) {
    let { uid, token } = req.query || req.params;

    if (!uid || !token) {
        let result = { error: ERR.PARAMS, reason: '缺少参数' };
        return res.status(403).send(JSON.stringify(result));
    }

    if (uid.length < 8) {
        let result = { error: ERR.PARAMS, reason: 'uid无效' };
        return res.status(403).send(JSON.stringify(result));
    }

    let value = await redis.get('user:' + uid).catch(err => {
        let result = { error: ERR.REDIS, reason: '未获取用户信息' };
        return res.status(500).send(JSON.stringify(result));
    });

    if (!value) {
        let result = { error: ERR.REDIS, reason: '获取用户信息错误' };
        return res.status(500).send(JSON.stringify(result));
    }
    let user = JSON.parse(value);
    if (token !== user.token) {
        let result = { error: ERR.PARAMS, reason: 'token无效' };
        return res.status(401).send(JSON.stringify(result));

    }
    next();
}