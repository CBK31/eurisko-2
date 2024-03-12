
// /import catModel from './categoryModel';

const errorMessages = require('./categoryError');

const catModel = require('./categoryModel');

const findCategByName = async (categName: string) => {
    const categFinder = await catModel.findOne({ name: categName });
    return categFinder;
};

const addCategory = async (name: string, desc: string) => {
    // console.log('the name is : ' + name);
    const categFinder = await findCategByName(name);

    if (categFinder) {

        const error: any = new Error(errorMessages.categoryExist.message);
        error.statusCode = errorMessages.categoryExist.statusCode;
        throw error;

    } else {
        await new catModel({
            name: name,
            description: desc
        }).save();
    }
};

export { addCategory, findCategByName };
