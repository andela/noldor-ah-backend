import Sequelize from 'sequelize';
import Models from '../db/models';


const { Op } = Sequelize;


const { Article } = Models;


/**
 * @class { ReactionHelper }
 * @description { Handles for like and unlike helpers }
 */
class ReactionHelper {
  /**
     * @description { decodes the slug }
     * @param { object } req
     * @returns { string } articleId
     */
  static slugDecoder(req) {
    const { slug } = req.params;
    const articleId = slug.split('-').pop();

    // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric/389022#389022
    const pattern = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
    const id = pattern.test(articleId);

    if (articleId.length !== 12 || id !== true) {
      return null;
    }
    return articleId;
  }

  /**
     * @description { Check if article has been reacted to by user }
     * @param { object } req
     * @param { object } res
     * @returns { boolean } TRUE/FALSE
     *
     */
  static async findArticle(req, res) {
    try {
      const articleExist = await Article.findOne({
        where: {
          slug: {
            [Op.like]: `%${ReactionHelper.slugDecoder(req)}`
          }
        }
      });
      if (!articleExist) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'article not found',
          }
        });
      }
      const status = await articleExist.hasUsers(req.user.payload.id);
      const article = {
        status,
        article: articleExist
      };

      // console.log(status)
      return article;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      });
    }
  }
}

export default ReactionHelper;
