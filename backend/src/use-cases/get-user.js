module.exports = function makeGetUser({Joi, usersDb, getP5History}) {
    return async function getUser({id}) {
        validateInfo({
            id
        });
        console.info(`get user use case called with id: ${id} `);
        // call db function to update user
        const userDetails = await usersDb.getUserDetailsById({id});
        let totalP5 = 100;
        const p5History = (await getP5History({id: userDetails.id})).data;
        if (p5History && p5History.length) {
            for (const p5 of p5History) {
                totalP5-= p5.point;
            }
        }
        userDetails.p5Balance = totalP5;
        return {
            status: 'Success',
            data: userDetails,
        };
    };

    function validateInfo({id}) {
        const schema = Joi.object().keys({
            id: Joi.number().required(),
        });
        const {error} = schema.validate({
            id
        });
        if (error) throw new Error(error.message);
    }
};
