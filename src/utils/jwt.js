const jwt = require("jsonwebtoken");

const config = require("../../config");

const sign = (payload) => jwt.sign(payload, config.JWT_SECRET_KEY, {expiresIn: "1h"});

const verify = (payload, callback) => jwt.verify(payload, config.JWT_SECRET_KEY, callback);

module.exports = {sign,verify};
