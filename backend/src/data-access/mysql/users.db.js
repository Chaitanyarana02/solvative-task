const TABLE_NAME = 'users';
module.exports = function makeUsersDb({
                                         mysql
                                     }) {
    return Object.freeze({
        getAllUsers,
        createUser,
        updateUser,
        getUserDetailsById,
    });

    async function getAllUsers() {
        const [result] = await mysql.execute(
            `SELECT * FROM ${TABLE_NAME}`
        )

        return result;
    }

    async function createUser({addInfo}) {
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

    async function updateUser({updateInfo, id}) {
        const detailsToUpdate = {}
        for (const key of Object.keys(updateInfo)) {
            if(updateInfo[key] !== undefined) {
                detailsToUpdate[key] = updateInfo[key]
            }
        }

        const query = `UPDATE ${TABLE_NAME} SET ? WHERE id =?`;
        const values = [detailsToUpdate, id];

        console.info({query, values});

        await mysql.query(query, values,);
    }

    async function getUserDetailsById({id}) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id =?`;
        const values = [id];
        console.info({query, values});
        const [result] = await mysql.query(query, values);
        return result[0]
    }
};
