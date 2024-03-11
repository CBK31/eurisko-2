const errorMessages = require('./userError');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');


const findUserByEmail = async (email: String) => {

    return await userModel.findOne({ email: email });
}


const createUser = async (email: String, firstName: String, lastName: String, password: String, isVIP: Boolean, isAdmin: Boolean) => {

    let hashedpass = await bcrypt.hash(password, 12);

    let userF = await findUserByEmail(email);

    if (userF) {

        const error: any = new Error(errorMessages.userExist.message);
        error.statusCode = errorMessages.userExist.statusCode;

        throw error;

    } else {
        await new userModel({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedpass,
            isVIP: isVIP,
            isAdmin: isAdmin
        }).save();
    }
}






export { createUser };