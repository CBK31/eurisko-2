const otpError = require('./otpError');
const otpModel = require('./otpModel');
const axios = require('axios');
import { findUserByEmail } from '../user/userService'

const otpFinderByUserId = async (userId: string) => {
    return await otpModel.findOne({ userId: userId });
}


const saveOTP = async (myOTP: string, userId: string) => {

    const currentTime = new Date();

    await otpModel({
        userId: userId,
        otpCode: myOTP,
        expirationTime: new Date(currentTime.getTime() + 5 * 60000),
        life: 5,
        isUsed: false
    }).save();

}

const sendOTP = async (email: String, myOTP: string) => {

    const data = new URLSearchParams({
        'apikey': '4D248F86759751CE0D227B29BA732E077E0978E80184E9385E83650C93E8AAC51987988B56062CCED504B757AEBB9185',
        'subject': 'your OTP code',
        'from': 'charbelak311@gmail.com',
        'to': email as string,
        'bodyHtml': `your OTP code is :  ${myOTP}`,
        'isTransactional': 'true'
    });

    return await axios.post('https://api.elasticemail.com/v2/email/send', data);

}

const OTPsaver = async (myOTP: string, email: string) => {

    let userFinder = await findUserByEmail(email);

    if (userFinder) {
        const currentTime = new Date();
        const otpFinder = await otpFinderByUserId(userFinder._id);

        if (otpFinder) {
            if (otpFinder.expirationTime > currentTime) {

                const error: any = new Error(otpError.otpAlreadyExist.message);
                error.statusCode = otpError.otpAlreadyExist.statusCode;
                throw error;

            } else {

                await otpModel.deleteOne({ _id: otpFinder._id })
                await saveOTP(myOTP, userFinder._id);

            }

        } else {
            await saveOTP(myOTP, userFinder._id);
        }

    } else {
        const error: any = new Error(otpError.userNotFound.message);
        error.statusCode = otpError.userNotFound.statusCode;
        throw error;
    }
}



export { sendOTP, OTPsaver, otpFinderByUserId };