module.exports = function makeGiveReward({Joi, rewardHistoryDb, getP5History}) {
    return async function giveReward({rewardGiver, rewardReceiver, amount}) {
        validateInfo({
            rewardGiver, rewardReceiver, amount
        });
        console.info(`Give use case called with rewardGiver: ${rewardGiver}, rewardReceiver: ${rewardReceiver}, amount: ${amount}`);
        let totalP5 = 100;
        const p5History = (await getP5History({id: rewardGiver})).data;
        if (p5History && p5History.length) {
            for (const p5 of p5History) {
                totalP5-= p5.point;
            }
        }
        if (totalP5 < amount) throw new Error('Insufficient balance');
        await rewardHistoryDb.addReward({
            addInfo: {
                point: amount,
                givenBy: rewardGiver,
                givenTo: rewardReceiver,
            }
        })
        return {
            status: 'Success',
            data: {
                message: 'Reward given successfully'
            }
        };
    };

    function validateInfo({rewardGiver, rewardReceiver, amount}) {
        const schema = Joi.object().keys({
            rewardGiver: Joi.number().required(),
            rewardReceiver: Joi.number().required(),
            amount: Joi.number().max(100).required(),
        });
        const {error} = schema.validate({
            rewardGiver, rewardReceiver, amount
        });
        if (error) throw new Error(error.message);
    }
};
