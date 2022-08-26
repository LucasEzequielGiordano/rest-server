const { Category, Product } = require("../models");
const Role = require("../models/role");
const user = require("../models/user");

const roleValid = async (role = "") => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`The role ${role} is not registered in our database`);
    }
};

const mailExist = async (mail = "") => {
    const emailExist = await user.findOne({ mail });
    if (emailExist) {
        throw new Error(`The email address: ${mail}, exist in our database`);
    }
};

const userByIdExist = async (id) => {
    const userExist = await user.findOne({ id });
    if (!userExist) {
        throw new Error(`The id address: ${id}, exist in our database`);
    }
};

const categoryExistById = async (id) => {
    const categoryExist = await Category.findOne({ id });
    if (!categoryExist) {
        throw new Error(`The id address: ${id}, exist in our database`);
    }
};

const productExistById = async (id) => {
    const productExist = await Product.findOne({ id });
    if (!productExist) {
        throw new Error(`The id address: ${id}, exist in our database`);
    }
};

module.exports = {
    roleValid,
    mailExist,
    userByIdExist,
    categoryExistById,
    productExistById,
};
