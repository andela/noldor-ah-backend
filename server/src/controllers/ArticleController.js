import Slug from 'slug';
import Models from '../db/models';
import ArticleWorker from '../workers/ArticleWorker';
import Helpers from '../helpers/index';
import TagWorker from '../workers/TagWorker';
import RatingsHelper from '../helpers/articleRatings';

const {
  Sequelize, Article,
} = Models;
const { Op } = Sequelize;
const {
  checkArticle, getAllArticles, findArticle, publish,
  getUserArticles, deleteArticle, updateArticle
} = ArticleWorker;
const { addTags } = TagWorker;


/**
 * @class { ArticleController }
 * @description { Handles Articles Requests }
 */
class ArticleController {
  /**
     *
     * @param { object } req
     * @param { object } res
     * @returns { object } Json
     */
  static async allArticles(req, res) {
    try {
      const allArticles = await getAllArticles();
      if (allArticles.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'article not found',
          }
        });
      }
      res.status(200).json({ articles: allArticles });
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
   * @description { Get all users articles}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static async userArticles(req, res) {
    const userId = req.user.payload.id;

    try {
      const getArticle = await getUserArticles(userId, true);
      if (getArticle.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'article not found',
          }
        });
      }
      return res.status(200).json({
        success: true,
        article: getArticle
      });
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
   * @description { Get all users articles}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static async userDrafts(req, res) {
    const userId = req.user.payload.id;

    try {
      const getArticle = await getUserArticles(userId, false);
      if (getArticle.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'no draft found',
          }
        });
      }
      return res.status(200).json({
        success: true,
        article: getArticle
      });
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
   * @description { get an article by an id}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   * @name getAnArticle
   */
  static async getAnArticle(req, res) {
    try {
      const article = await findArticle(req, res);

      if (article) {
        const likes = await article.countUsers();
        const tags = await article.getTags({ attributes: ['name'] });
        article.dataValues.likes = likes;
        const tagsArray = tags.map(x => x.name);
        article.dataValues.tags = tagsArray;

        res.status(200).json({
          success: true,
          article
        });
      }
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
   * @description { create an article }
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async postArticle(req, res) {
    req.body.userId = req.user.payload.id;
    req.body.slug = Slug(req.body.title, { lower: true, replacement: '-' });
    req.body.published = false;
    const { tags } = req.body;

    try {
      const article = await Article.create(req.body, {
        fields: Object.keys(req.body)
      });

      if (tags) addTags(tags, article);

      return res.status(201).json({
        success: true,
        message: 'article was added successfully',
        article,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   * @description { publish an article}
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async publishArticle(req, res) {
    const userId = req.user.payload.id;
    const foundArticle = await checkArticle(req, res);
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    const { id } = foundArticle.dataValues;
    await publish(id, res);
    return res.status(201).json({
      success: true,
      message: 'article published successfully'
    });
  }

  /**
   * @description { Update an article }
   * @description { Only title content description can be updated by author}
   * @param { object } req - request body
   * @param { object } res - response body
   * @returns { object } JSON
   */
  static async updateArticle(req, res) {
    const userId = req.user.payload.id;
    const foundArticle = await checkArticle(req, res);
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    await updateArticle(req, res);
    return res.status(201).json({
      success: 'true',
      message: 'article has been updated successfully'
    });
  }

  /**
   * @description { delete an article}
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async deleteArticle(req, res) {
    const userId = req.user.payload.id;
    const foundArticle = await checkArticle(req, res);
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    const { id } = foundArticle.dataValues;
    await deleteArticle(id, res);
    return res.status(204).json({
    });
  }


  /**
   * @description { updates article tags }
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async updateTags(req, res) {
    const articleId = Helpers.slugDecoder(req);
    const userId = req.user.payload.id;
    const newTags = req.body.tags;

    if (!newTags) {
      return res.status(400).json({
        success: false,
        message: 'tags field is required',
      });
    }

    const article = await Article.findOne({
      where: {
        slug: { [Op.like]: `%${articleId}` }
      }
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'article not found',
      });
    }

    if (article.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized',
      });
    }

    let results = await article.getTags({ attributes: ['id'] });
    results = JSON.parse(JSON.stringify(results));

    const oldTags = results.map(tag => tag.id);

    await article.removeTags(oldTags);
    addTags(newTags, article);

    return res.status(200).json({
      success: true,
      message: 'tags updated successfully',
    });
  }


  // Article ratings ----------------------
  /**
   *
   * @description { Get all users articles }
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static async rateArticles(req, res) {
    await RatingsHelper.queryArticle(req, res).then((data) => {
      if (data.count > 0) {
        RatingsHelper.queryUserRatings(req).then((user) => {
          if (user.count > 0) {
            return res.status(403).json({ success: false, message: 'You already rated this article' });
          }
          RatingsHelper.rateArticle(req, res);
          setTimeout(() => {
            RatingsHelper.getArticleAverageRate(req, res);
          }, 3000);
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Article with the specified ID was not found'
        });
      }
    }).catch(error => res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        error: error.message
      }
    }));
  }
}

export default ArticleController;
