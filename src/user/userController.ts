import { Request, Response } from 'express';
import { findUserByEmail, createUser, logInService, sendOTP } from './userService';
import "express-session";
const jwt = require('jsonwebtoken');
const userError = require('./userError');


declare module "express-session" {
    interface Session {
        isLoggedIn: boolean;
        userId: string;
    }
}

const signUp = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, firstName, lastName, password, isVIP, isAdmin } = req.body;

        await createUser(email, firstName, lastName, password, isVIP, isAdmin);

        res.status(200).json({ message: 'user added successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
        //  res.status(error.statusCode).json({ message: error.message });
    }
}


const login = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, password } = req.body;

        const userFinder = await logInService(email, password);

        if (userFinder) {

            req.session.isLoggedIn = true;
            req.session.userId = userFinder._id;

            const token = jwt.sign({ email: email }, 'a_secret_key');
            res.status(200).json({ token: token });
        }
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
}

const forgetpassword = async (req: Request, res: Response): Promise<void> => {

    try {

        const { email } = req.body;

        if (await findUserByEmail(email)) {
            await sendOTP(email);
            res.status(200).json({ message: 'OTP sent successfully' });
        } else {
            res.status(userError.userNotFound.statusCode).json({ message: userError.userNotFound.message });
        }


    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }


}



export { signUp, login, forgetpassword };