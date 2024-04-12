module.exports = function makeUpdateUser({Joi, usersDb}) {
    return async function updateUser({name, id}) {
        validateInfo({
            name, id
        });
        console.info(`update user use case called with name: ${name}, id: ${id} `);
        // call db function to update user
        await usersDb.updateUser({
            id,
            updateInfo: {
                name,
            }
        })
        return {
            status: 'Success',
            data: {
                message: 'User updated successfully.'
            }
        };
    };

    function validateInfo({name, id}) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.number().required(),
        });
        const {error} = schema.validate({
            name, id
        });
        if (error) throw new Error(error.message);
    }
};
