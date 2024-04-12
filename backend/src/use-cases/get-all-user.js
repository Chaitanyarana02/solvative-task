module.exports = function makeGetAllUsers({usersDb, getRewardHistory, getP5History}) {
    return async function getAllUsers() {
        console.info(`get all user use case called`);
        // call db function to update user
        const allUsers = await usersDb.getAllUsers();
        if (allUsers && allUsers.length) {
            for (const user of allUsers) {
                const rewardHistory = (await getRewardHistory({id: user.id})).data;
                let totalReward = 0;
                if (rewardHistory && rewardHistory.length) {
                    console.info(rewardHistory)
                    for (const reward of rewardHistory) {
                        totalReward+= reward.point;
                    }
                }
                let totalP5 = 100;
                const p5History = (await getP5History({id: user.id})).data;
                if (p5History && p5History.length) {
                    console.info(rewardHistory)
                    for (const p5 of p5History) {
                        totalP5-= p5.point;
                    }
                }
                user.p5Balance = totalP5;
                user.totalReward = totalReward;
            }
        }
        return {
            status: 'Success',
            data: allUsers
        };
    };
}
