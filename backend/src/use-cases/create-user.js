module.exports = function makeCreateUser({Joi, usersDb}) {
    return async function createUser({name}) {
        validateInfo({
            name
        });
        console.info(`create user use case called with data: ${name}`);
        // call db function to insert user
        await usersDb.createUser({addInfo: {name}})
        return {
            status: 'Success',
            data: {
                message: 'User created successfully'
            }
        };
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
