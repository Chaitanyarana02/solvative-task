const Joi = require('@hapi/joi');
const DB = require('../data-access')

const makeTest = require('./test');
const test = makeTest({
    Joi,
});

const makeCreateUser = require('./create-user');
const createUser = makeCreateUser({
    Joi,
    usersDb: DB.mysql.usersDb,
});

const makeUpdateUser = require('./update-user');
const updateUser = makeUpdateUser({
    Joi,
    usersDb: DB.mysql.usersDb,
});

const makeGetP5History = require('./get-p5-history');
const getP5History = makeGetP5History({
    Joi,
    rewardHistoryDb: DB.mysql.rewardHistoryDb,
});

const makeGiveReward = require('./give-reward');
const giveReward = makeGiveReward({
    Joi,
    rewardHistoryDb: DB.mysql.rewardHistoryDb,
    getP5History,
});

const makeGetRewardHistory = require('./get-reward-history');
const getRewardHistory = makeGetRewardHistory({
    Joi,
    rewardHistoryDb: DB.mysql.rewardHistoryDb,
});

const makeGetUser = require('./get-user');
const getUser = makeGetUser({
    Joi,
    usersDb: DB.mysql.usersDb,
    getP5History,
});

const makeDeleteGivenP5 = require('./delete-given-p5');
const deleteGivenP5 = makeDeleteGivenP5({
    Joi,
    rewardHistoryDb: DB.mysql.rewardHistoryDb,
});

const makeGetAllUsers = require('./get-all-user');
const getAllUsers = makeGetAllUsers({
    usersDb: DB.mysql.usersDb,
    getP5History,
    getRewardHistory,
});


// Export use cases
module.exports = Object.freeze({
    test,
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    getP5History,
    giveReward,
    getRewardHistory,
    deleteGivenP5,
});
