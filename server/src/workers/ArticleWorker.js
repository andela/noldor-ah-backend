import Sequelize from 'sequelize';
import Models from '../db/models';
import Helpers from '../helpers/index';

const { Op } = Sequelize;
const { User, Article } = Models;

/**
 * @class { ArticleWorker }
 * @description { Handles for like and unlike }
 */
class ArticleWorker {
  /**
   * @description { worker to get all articles }
   * @param { object } res
   * @returns { object } JSON
   */
  static async getAllArticles() {
    return Article.findAll({
      where: {
        published: true
      },
      attributes: ['slug', 'title',
        'description', 'content', 'published',
        'createdAt', 'updatedAt'],
      include: [{
        model: User, attributes: ['username', 'bio', 'avatarUrl']
      }]
    });
  }

  /**
   *
   * @param { string } id
   * @param { boolean } publish
   * @param { string } res
   * @return { object } JSON
   */
  static async getUserArticles(id, publish, res) {
    try {
      const article = await Article.findAll({
        where: {
          userId: id,
          published: publish
        },
        attributes: ['slug', 'title',
          'description', 'published', 'content',
          'createdAt', 'updatedAt']
      });
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

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async updateArticle(req, res) {
    try {
      const id = await Helpers.slugDecoder(req);
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
    try {
      const id = await Helpers.slugDecoder(req);
      const articleExist = await Article.findOne({
        where: {
          slug: {
            [Op.like]: `%${id}`
          },
        }
      });
      if (!articleExist) {
        return null;
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
     * @description { Check if article has been reacted to by user }
     * @param { object } req
     * @param { object } res
     * @returns { boolean } TRUE/FALSE
     *
     */
  static async findArticle(req, res) {
    const id = await Helpers.slugDecoder(req);
    try {
      const articleExist = await Article.findOne({
        where: {
          slug: {
            [Op.like]: `%${id}`
          },
          published: true
        },
        attributes: ['id', 'slug', 'title',
          'description', 'published', 'content',
          'createdAt', 'updatedAt'],
        include: [
          {
            model: User, attributes: ['id', 'username', 'bio', 'avatarUrl']
          }]
      });
      if (!articleExist) {
        return null;
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

export default ArticleWorker;
