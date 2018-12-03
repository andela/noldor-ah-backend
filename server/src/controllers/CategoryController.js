import Models from '../db/models';
import httpResponseHelper from '../helpers/httpResponse';

const { Category } = Models;
const { goodResponse, badResponse } = httpResponseHelper;

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
