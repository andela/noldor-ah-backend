import Sequelize from 'sequelize';
import Models from '../db/models';
import Helpers from '../helpers/index';
import TagWorker from './TagWorker';

const { Op } = Sequelize;
const { User, Article, Category } = Models;

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
  static async getAllArticles(res) {
    try {
      const article = await Article.findAll({
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
      return article;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
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
   * @param { object } article
   * @returns { object } JSON
   */
  static async updateArticle(req, res, article) {
    try {
      const id = await Helpers.slugDecoder(req);
      const input = {};

      if (req.body.title) {
        input.title = req.body.title;
      }
      if (req.body.content) {
        input.content = req.body.content;
      }
      if (req.body.description) {
        input.description = req.body.description;
      }
      if (req.body.category) {
        req.body.category = req.body.category.toLowerCase();
        const category = await Category.findOne({ where: { name: req.body.category } });

        if (!category) {
          const availableCategories = await Category.findAll({
            attributes: ['name']
          }).map(res => res.name);

          return res.status(400).json({
            success: false,
            message: 'selected category does not exist',
            availableCategories
          });
        }

        input.category = req.body.category;
      }
      if (req.body.tags) {
        const oldTags = await article.getTags({ attributes: ['id'] })
          .then(res => JSON.parse(JSON.stringify(res)))
          .map(tag => tag.id);

        await article.removeTags(oldTags)
          .then(() => TagWorker.addTags(req.body.tags, article));
      }

      await Article.update(
        input,
        {
          where: {
            slug: {
              [Op.like]: `%${id}`
            }
          }
        }
      );

      return res.status(200).json({
        success: 'true',
        message: 'article has been updated successfully'
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
