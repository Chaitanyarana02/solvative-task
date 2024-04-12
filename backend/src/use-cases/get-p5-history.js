module.exports = function makeGetP5History({Joi, rewardHistoryDb}) {
    return async function getP5History({id}) {
        validateInfo({
            id
        });
        console.info(`get p5 history use case called with id: ${id} `);
        const p5History = await rewardHistoryDb.getPointsGivenBy({id});
        return {
            status: 'Success',
            data: p5History,
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
