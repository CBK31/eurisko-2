import { Request, Response } from 'express';
import { addCategory, getcategoriesPaginated, getOneCategoryById } from './categoryService';
import { findUserFromToken } from '../user/userService';

const addCateg = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryName, categoryDescription } = req.body;

        await addCategory(categoryName, categoryDescription);

        res.status(200).json({ message: 'category added successfully' });
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

const getcategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const requestedPage = parseInt(req.query.page as any, 10);
        let itempPerPage = 3;
        const categoriesFinder = await getcategoriesPaginated(requestedPage, itempPerPage);
        res.status(200).json({ categoriesFinder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getOnecategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.body;
        const finder = await getOneCategoryById(categoryId);
        res.status(200).json({ finder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


}

export { addCateg, getcategories, getOnecategory };
