import Slug from 'slug';
import Models from '../db/models';
import decoder from '../helpers/decoder';
import ArticleWorker from '../workers/ArticleWorker';
import Helpers from '../helpers/index';
import TagWorker from '../workers/TagWorker';
import ReadingStatsWorker from '../workers/ReadingStatsWorker';
import httpResponse from '../helpers/response';

const {
  Article, Category
} = Models;

const {
  getArticleDetails,
  createReadingsStats
} = ReadingStatsWorker;

const {
  checkArticle, getAllArticles, findArticle, publish,
  getUserArticles, deleteArticle, updateArticle
} = ArticleWorker;
const { addTags } = TagWorker;

const { postValidation } = Helpers.ArticleValidation;

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
    const allArticles = await getAllArticles(res);
    if (allArticles.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'article not found',
        }
      });
    }
    res.status(200).json({ articles: allArticles });
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

    const getArticle = await getUserArticles(userId, true, req);
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

    const getArticle = await getUserArticles(userId, false, req);
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
  }

  /**
   *
   * @description { get an article by an id}
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Json
   * @name getAnArticle
   */
  static async getAnArticle(req, res) {
    const article = await findArticle(req, res);
    // Get article details
    if (!article) {
      return httpResponse.badResponse(res, 404, 'Article with the specified slug was not found.');
    }
    if (req.header('x-token')) {
      decoder.validateToken(req, res);
      const userId = req.user.payload.id;
      const getDetails = await getArticleDetails(article.id, res);
      const { id: articleId } = getDetails;
      await createReadingsStats(userId, articleId);
    }
    if (article === null) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'article not found',
        }
      });
    }
    const likes = await article.countUsers();
    const tags = await article.getTags({ attributes: ['name'] });
    article.dataValues.likes = likes;
    const tagsArray = tags.map(x => x.name);
    article.dataValues.tags = tagsArray;
    article.dataValues.highlights = await article.getHighlights({
      attributes: ['id', 'commentId', 'highlight']
    });

    return res.status(200).json({
      success: true,
      article
    });
  }


  /**
   * @description { create an article }
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async postArticle(req, res) {
    const validationError = await postValidation(req, res);

    if (!validationError) {
      req.body.userId = req.user.payload.id;
      req.body.slug = Slug(req.body.title, { lower: true, replacement: '-' });
      req.body.published = false;
      req.body.category = req.body.category.toLowerCase();
      const { tags } = req.body;
      try {
        const existingCategory = await Category.findOne({ where: { name: req.body.category } })
          .then(res => Helpers.format(res));

        if (!existingCategory) {
          const availableCategories = await Category.findAll({
            attributes: ['name']
          }).map(category => category.name);

          return res.status(400).json({
            success: false,
            message: 'selected category does not exist',
            availableCategories
          });
        }

        const article = await Article.create(req.body, {
          fields: Object.keys(req.body)
        });

        if (tags) await addTags(tags, article);

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
    if (foundArticle === null) {
      return res.status(404).json({
        success: false,
        message: 'article not found'
      });
    }
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    const { id } = foundArticle.dataValues;
    await publish(id, res);
    await Helpers.NotificationHelper.addNotification(req.header.host, id, 'article', userId);
    return res.status(200).json({
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
    if (foundArticle === null) {
      return res.status(404).json({
        success: false,
        message: 'article not found'
      });
    }
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    updateArticle(req, res, foundArticle);
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
    if (foundArticle === null) {
      return res.status(404).json({
        success: false,
        message: 'article not found'
      });
    }
    if (foundArticle.dataValues.userId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      });
    }
    const { id } = foundArticle.dataValues;
    await deleteArticle(id, res);
    return res.status(200).json({
      success: true,
      message: 'article has been successfully deleted'
    });
  }

  /**
   *
   * @description { rate published articles }
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static async rateArticles(req, res) {
    await Helpers.articleRatings.queryArticle(req, res).then((data) => {
      if (data.count > 0) {
        Helpers.articleRatings.queryUserRatings(req).then((user) => {
          if (user.count > 0) {
            return res.status(403).json({
              success: false,
              message: 'You already rated this article'
            });
          }
          Helpers.articleRatings.rateArticle(req, res);
          setTimeout(() => {
            Helpers.articleRatings.getArticleAverageRate(req, res);
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
