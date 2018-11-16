import Models from '../db/models';

const { Category } = Models;

const getArticles = async (req, res) => {
  let { category } = req.params;
  category = category.toLowerCase();
  try {
    const foundCategory = await Category.findOne({ where: { name: category } });
    const articles = await foundCategory.getArticles({ where: { published: true } });
    if (!articles.length) {
      return res.status(200).json({
        success: true,
        message: `${category} does not have any articles yet`
      });
    }
    return res.status(200).json({
      success: true,
      message: `retrieved all articles of ${category}`,
      articles
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'category does not exist'
    });
  }
};

export default {
  getArticles,
};
