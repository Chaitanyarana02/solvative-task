module.exports = function makeDeleteGivenP5({Joi, rewardHistoryDb}) {
    return async function deleteGivenP5({p5Id}) {
        validateInfo({
            p5Id
        });
        console.info(`delete given use case called with p5Id: ${p5Id} `);
        // call db function to update user
        await rewardHistoryDb.deleteP5EntryById({id: p5Id});
        return {
            status: 'Success',
            data: {
                message: 'Deleted successfully'
            }
        };
    };

    function validateInfo({p5Id}) {
        const schema = Joi.object().keys({
            p5Id: Joi.number().required(),
        });
        const {error} = schema.validate({
            p5Id
        });
        if (error) throw new Error(error.message);
    }
};
