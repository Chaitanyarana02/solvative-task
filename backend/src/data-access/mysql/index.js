const MYSQL = require("mysql2");
const config = require("../../config");
let pool = MYSQL.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.db,
    waitForConnections: true,
    connectionLimit: config.mysql.connectionLimit,
    queueLimit: 0,
});
const mysql = pool.promise();

const makeUsersDb = require('./users.db');
const usersDb = makeUsersDb({mysql});

const makeRewardHistoryDb = require('./reward-history.db');
const rewardHistoryDb = makeRewardHistoryDb({mysql});

module.exports = Object.freeze({
    usersDb,
    rewardHistoryDb,
});
