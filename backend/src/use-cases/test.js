module.exports = function makeTest({Joi}) {
    return async function test({name}) {
        validateInfo({
            name
        });
        return name;
    };

    function validateInfo({name}) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        const {error} = schema.validate({
            name
        });
        if (error) throw new Error(error.message);
    }
};
