import Models from '../db/models';
import httpResponseHelper from '../helpers/httpResponse';

const { Category } = Models;
const { goodResponse, badResponse } = httpResponseHelper;

export const getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  const allCategories = categories.map(x => x.name);
  return goodResponse(res, 200, 'retrieved successfully', allCategories);
};

const getArticles = async (req, res) => {
  let { category } = req.params;
  category = category.toLowerCase();
  try {
    const foundCategory = await Category.findOne({ where: { name: category } });
    const articles = await foundCategory.getArticles({ where: { published: true } });

    if (!articles.length) {
      return goodResponse(res, 200, `${category} does not have any articles yet`);
    }

    return goodResponse(res, 200, `retrieved all articles of ${category}`, articles);
  } catch (error) {
    return badResponse(res, 400, 'category does not exist');
  }
};

export default getArticles;
