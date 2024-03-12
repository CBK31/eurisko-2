import { Request, Response } from 'express';
import "express-session";
const jwt = require('jsonwebtoken');
const complaintError = require('./complaintError');
import { createComplaint, findUserFromToken, getComplaintByUserId } from './complaintService';



const submit = async (req: Request, res: Response): Promise<void> => {

    try {
        const { title, body, categories } = req.body;
        const userFinder = await findUserFromToken(req);


        await createComplaint(userFinder._id, title, body, categories);

        res.status(200).json({ message: 'complaint added successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getcomplains = async (req: Request, res: Response): Promise<void> => {

    try {

        const requestedPage = parseInt(req.query.page as any, 10);
        let itempPerPage = 3;

        const userFinder = await findUserFromToken(req);
        const complaintFinder = await getComplaintByUserId(userFinder._id, requestedPage, itempPerPage);

        res.status(200).json({ complaintFinder });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


export { submit, getcomplains };