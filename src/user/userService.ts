const errorMessages = require('./userError');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');

const updatePassword = async (userid, newPassword) => {

    let hashedpass = await bcrypt.hash(newPassword, 12);

    await userModel.findOneAndUpdate(
        { _id: userid },
        { $set: { password: hashedpass } }
    );


}

const findUserByEmail = async (email: String) => {

    const aUser = await userModel.findOne({ email: email });
    return aUser;
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

const logInService = async (email: String, password: String) => {

    let userFinder = await findUserByEmail(email);

    if (userFinder) {

        let passChecker = await bcrypt.compare(password, userFinder.password);

        if (email == userFinder.email && passChecker) {

            return userFinder;

        } else {
            const error: any = new Error(errorMessages.incorrectPass.message);
            error.statusCode = errorMessages.incorrectPass.statusCode;
            throw error;
        }

    } else {
        const error: any = new Error(errorMessages.userNotFound.message);
        error.statusCode = errorMessages.userNotFound.statusCode;
        throw error;
    }



}



export { createUser, logInService, findUserByEmail, updatePassword };