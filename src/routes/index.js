const authorizationRouter = require("./authorization_route");
const usersRouter = require("./users_route");
const serviceRouter = require("./service_route");
const transactionRouter = require("./transaction_route");

module.exports = [authorizationRouter, usersRouter, serviceRouter, transactionRouter];
