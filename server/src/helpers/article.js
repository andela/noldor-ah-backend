import Sequelize from 'sequelize';
import Models from '../db/models';


const { Op } = Sequelize;


const { User, Article } = Models;


/**
 * @class { ReactionHelper }
 * @description { Handles for like and unlike helpers }
 */
class ArticleHelper {
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
   * @description { helper to get all articles }
   * @returns { object } JSON
   */
  static async getAllArticles() {
    return Article.findAll({
      where: {
        published: true
      },
      attributes: ['slug', 'title', 'description', 'content', 'published', 'createdAt', 'updatedAt'],
      include: [{
        model: User, attributes: ['username', 'bio', 'avatarUrl']
      }]
    });
  }

  /**
   *
   * @param { string } id
   * @param { string } publish
   * @return { object } JSON
   */
  static async getUserArticles(id, publish) {
    return Article.findAll({
      where: {
        userId: id,
        published: publish
      },
      attributes: ['slug', 'title', 'description', 'published', 'content', 'createdAt', 'updatedAt']
    });
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async updateArticle(req, res) {
    try {
      const id = await ArticleHelper.slugDecoder(req);
      const input = {};

      if (req.body.title !== undefined) {
        input.title = req.body.title;
      }
      if (req.body.content !== undefined) {
        input.content = req.body.content;
      }
      if (req.body.description !== undefined) {
        input.description = req.body.description;
      }
      return Article.update(
        input,
        {
          where: {
            slug: {
              [Op.like]: `%${id}`
            }
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      });
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @return { object } JSON
   */
  static async checkArticle(req, res) {
    const id = await ArticleHelper.slugDecoder(req);
    const articleExist = await Article.findOne({
      where: {
        slug: {
          [Op.like]: `%${id}`
        },
      }
    });
    if (!articleExist) {
      return res.status(404).json({
        success: false,
        message: 'article not found'
      });
    }
    return articleExist;
  }


  /**
     * @description { Check if article has been reacted to by user }
     * @param { object } req
     * @param { object } res
     * @returns { boolean } TRUE/FALSE
     *
     */
  static async findArticle(req, res) {
    const id = await ArticleHelper.slugDecoder(req);
    try {
      const articleExist = await Article.findOne({
        where: {
          slug: {
            [Op.like]: `%${id}`
          },
          published: true
        },
        attributes: ['id', 'slug', 'title', 'description', 'published', 'content', 'createdAt', 'updatedAt'],
        include: [
          {
            model: User, attributes: ['id', 'username', 'bio', 'avatarUrl']
          }]
      });
      if (!articleExist) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'article not found',
          }
        });
      }
      return articleExist;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      });
    }
  }

  /**
   * @param { object } articleId
   * @param { object } res
   * @returns { object } JSON
   */
  static async deleteArticle(articleId, res) {
    try {
      return Article.destroy({
        where: {
          id: articleId
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      });
    }
  }

  /**
   * @param { string } articleId
   * @param { object } res
   * @return { object } JSON
   */
  static async publish(articleId, res) {
    try {
      Article.update(
        {
          published: true
        },
        {
          where: {
            id: articleId
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default ArticleHelper;
