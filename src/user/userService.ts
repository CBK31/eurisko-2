const errorMessages = require('./userError');
const bcrypt = require('bcryptjs');
const userModel = require('./userModel');



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

// const sendOTP = async (email: String, myOTP: string) => {

//     const data = new URLSearchParams({
//         'apikey': '4D248F86759751CE0D227B29BA732E077E0978E80184E9385E83650C93E8AAC51987988B56062CCED504B757AEBB9185',
//         'subject': 'your OTP code',
//         'from': 'charbelak311@gmail.com',
//         'to': email as string,
//         'bodyHtml': `your OTP code is :  ${myOTP}`,
//         'isTransactional': 'true'
//     });

//     return await axios.post('https://api.elasticemail.com/v2/email/send', data);

// }

// const OTPsaver = async (myOTP: string, email: string) => {

//     let userFinder = await findUserByEmail(email);


//     if (userFinder) {
//         saveOTP(myOTP, userFinder._id);
//     } else {
//         const error: any = new Error(errorMessages.userNotFound.message);
//         error.statusCode = errorMessages.userNotFound.statusCode;
//         throw error;
//     }



// }

export { createUser, logInService, findUserByEmail };