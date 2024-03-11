import { Request, Response } from 'express';
import { sendOTP, OTPsaver, otpFinderByUserId } from '../otp/otpServices';
const otpError = require('./otpError');
import { findUserByEmail } from '../user/userService'
const userError = require('../user/userError');


const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;
        const userFinder = await findUserByEmail(email)

        if (userFinder) {

            const otpFinder = await otpFinderByUserId(userFinder._id);

            if (otpFinder) {
                const currentTime = new Date();
                if (otpFinder.otpCode === otp && otpFinder.expirationTime > currentTime) {
                    res.status(200).json({ message: 'OTP match' });
                } else {
                    res.status(otpError.incorrectOTP.statusCode).json({ message: otpError.incorrectOTP.message });
                }
            } else {

                res.status(otpError.otpNotFound.statusCode).json({ message: otpError.otpNotFound.message });
            }

        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




export { verifyOTP };