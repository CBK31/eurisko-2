import { Request, Response } from 'express';
import { addCategory } from './categoryService';

const addCateg = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryName, categoryDescription } = req.body;

        await addCategory(categoryName, categoryDescription);

        res.status(200).json({ message: 'category added successfully' });
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

export { addCateg };
