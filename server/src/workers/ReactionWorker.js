import Sequelize from 'sequelize';
import Models from '../db/models';
import Helpers from '../helpers/index';

const { Op } = Sequelize;
const { Article } = Models;

/**
 * @class { ReactionHelper }
 * @description { Handles for like and unlike helpers }
 */
class ReactionWorker {
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
            [Op.like]: `%${Helpers.slugDecoder(req)}`
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

export default ReactionWorker;
