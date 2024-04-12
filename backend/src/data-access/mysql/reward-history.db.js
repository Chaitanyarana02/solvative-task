const TABLE_NAME = 'reward_history';
module.exports = function makeRewardHistoryDb({
                                          mysql
                                      }) {
    return Object.freeze({
        getPointsGivenTo,
        getPointsGivenBy,
        deleteP5EntryById,
        addReward,
    });

    async function addReward({addInfo}) {
        const detailsToAdd = {}
        for (const key of Object.keys(addInfo)) {
            if(addInfo[key] !== undefined) {
                detailsToAdd[key] = addInfo[key]
            }
        }

        const query = `INSERT INTO ${TABLE_NAME} SET ?`;
        const values = [detailsToAdd];

        await mysql.query(query, values,);
    }
    async function getPointsGivenBy({id}) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE givenBy =?`;
        const values = [id];
        console.info({query, values});
        const [result] = await mysql.query(query, values);
        return result
    }
    async function getPointsGivenTo({id}) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE givenTo =?`;
        const values = [id];
        console.info({query, values});
        const [result] = await mysql.query(query, values);
        return result
    }

    async function deleteP5EntryById({id}) {
        const query = `DELETE FROM ${TABLE_NAME} WHERE id =?`;
        const values = [id];
        console.info({query, values});
        await mysql.query(query, values);
    }
};
