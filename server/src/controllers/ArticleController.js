import Slug from 'slug';
import Sequelize from 'sequelize';
import Models from '../db/models';

const { Op } = Sequelize;

const { Article, User } = Models;

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
  static getAll(req, res) {
    Article.findAll({
      where: {
        published: true
      },
      attributes: ['slug', 'title', 'description', 'content', 'published', 'createdAt', 'updatedAt'],
      include: [{
        model: User, attributes: ['username', 'bio', 'avatarUrl']
      }]
    })
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            error: {
              message: 'article not found',
            }
          });
        }
        res.status(200).json({ articles: result });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   *
   * @description { Get all users articles}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static getUserArticles(req, res) { // need to check if user exist
    const userId = req.user.payload.id;

    Article.findAll({
      where: {
        userId
      },
      attributes: ['slug', 'title', 'description', 'published', 'content', 'createdAt', 'updatedAt']
    })
      .then((result) => {
        if (result.length < 1) {
          return res.status(404).json({
            success: false,
            error: {
              message: 'article not found',
            }
          });
        }
        res.status(200).json({
          success: true,
          article: result
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   *
   * @description { Get all users articles}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   */
  static userDrafts(req, res) { // need to check if user exist
    const userId = req.user.payload.id;
    Article.findAll({
      where: {
        userId,
        published: false
      },
      attributes: ['slug', 'title', 'description', 'published', 'content', 'createdAt', 'updatedAt'],
    })
      .then((result) => {
        if (result.length < 1) {
          return res.status(404).json({
            success: false,
            error: {
              msg: 'no draft found',
            }
          });
        }
        res.status(200).json({
          success: true,
          article: result
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   *
   * @description { get an article by an id}
   * @param {object} req
   * @param {object} res
   * @returns {object} Json
   * @name getAnArticle
   */
  static getAnArticle(req, res) {
    const articleId = ArticleController.slugDecoder(req, res);
    Article.findAll({
      where: {
        slug: {
          [Op.like]: `%${articleId}%`
        }
      },
      attributes: ['slug', 'title', 'description', 'published', 'content', 'createdAt', 'updatedAt'],
      include: [{
        model: User, attributes: ['username', 'bio', 'avatarUrl']
      }]
    })
      .then((result) => {
        if (result.length < 1) {
          return res.status(404).json({
            success: false,
            error: {
              message: 'article not found',
            }
          });
        }
        res.status(200).json({
          success: true,
          article: result
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   * @description { create an article }
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static postArticle(req, res) {
    const userId = req.user.payload.id;
    const {
      title, description, content, featuredImg
    } = req.body;
    const slug = Slug(title, { lower: true, replacement: '-' });
    const published = 0;
    Article.create({
      userId,
      title,
      description,
      content,
      slug,
      featuredImg,
      published
    })
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'article was added successfully',
          article: {
            slug: result.slug,
            title: result.title,
            description: result.description,
            content: result.content,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            published: result.published
          }
        });
      }).catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   * @description { publish an article}
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static publishArticle(req, res) {
    const userId = req.user.payload.id;
    const articleId = ArticleController.slugDecoder(req, res);
    Article.findAll({
      where: {
        slug: {
          [Op.like]: `%${articleId}`
        }
      }
    })
      .then((found) => {
        if (found.length === 0) {
          return res.status(404).json({
            success: false,
            error: {
              message: 'article not found',
            }
          });
        }

        if (found[0].dataValues.userId !== userId) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized'
          });
        }
        Article.update(
          {
            published: true
          },
          {
            where: {
              slug: {
                [Op.like]: `%${articleId}`
              }
            }
          }
        )
          .then(() => {
            res.status(201).json({
              success: true,
              message: 'article published successfully'
            });
          })
          .catch(error => res.status(500).json({
            success: false,
            error: {
              message: error.message,
            }
          }));
      }).catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   * @description { Update an article }
   * @description { Only title content description can be updated by author}
   * @param { object } req - request body
   * @param { object } res - response body
   * @returns { object } JSON
   */
  static updateArticle(req, res) {
    const userId = req.user.payload.id;

    const articleId = ArticleController.slugDecoder(req, res);

    Article.findAll({
      where: {
        slug: {
          [Op.like]: `%${articleId}`
        }
      }
    })
      .then((found) => {
        if (found.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'article not found'
          });
        }
        if (found[0].dataValues.userId !== userId) {
          return res.status(401).json({
            success: false,
            message: 'unauthorized'
          });
        }
        const input = {};
        // const { title, content, description } = found;

        if (req.body.title !== undefined) {
          input.title = req.body.title;
        }
        if (req.body.content !== undefined) {
          input.content = req.body.content;
        }
        if (req.body.description !== undefined) {
          input.description = req.body.description;
        }
        Article.update(
          input,
          {

            where: {
              slug: {
                [Op.like]: `%${articleId}`
              }
            }

          }
        )
          .then(() => {
            res.status(201).json({
              success: 'true',
              message: 'article has been updated successfully'
            });
          })
          .catch(error => res.status(500).json({
            success: false,
            error: {
              message: error.message,
            }
          }));
      }).catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   * @description { delete an article}
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static deleteArticle(req, res) {
    const userId = req.user.payload.id;
    const articleId = ArticleController.slugDecoder(req, res);

    Article.findAll({
      where: {
        slug: {
          [Op.like]: `%${articleId}`
        }
      }
    })
      .then((found) => {
        if (found.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Article not found'
          });
        }
        if (found[0].dataValues.userId !== userId) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized'
          });
        }
        Article.destroy({
          where: {
            slug: {
              [Op.like]: `%${articleId}`
            }
          }
        })
          .then(() => {
            res.status(204).json({
              success: true,
              message: 'article deleted successfully'
            });
          }).catch(error => res.status(500).json({
            success: false,
            error: {
              message: error.message,
            }
          }));
      }).catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }


  /**
   *
   * @description { decodes the slug }
   * @param { object } req
   * @param { object } res
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
}

export default ArticleController;
