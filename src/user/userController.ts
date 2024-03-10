import { Request, Response } from 'express';
import { createUser } from './userService';


const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, firstName, lastName, password, isVIP, isAdmin } = req.body;

        await createUser(email, firstName, lastName, password, isVIP, isAdmin);

        res.status(200).json({ message: 'user added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { signUp };