module.exports = function makeGetRewardHistory({Joi, rewardHistoryDb}) {
    return async function getRewardHistory({id}) {
        validateInfo({
            id
        });
        console.info(`get reward history use case called with id: ${id} `);
        const rewardHistory = await rewardHistoryDb.getPointsGivenTo({id});
        return {
            status: 'Success',
            data: rewardHistory
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
