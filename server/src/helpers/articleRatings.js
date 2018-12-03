import models from '../db/models';

const { Article, Ratings } = models;
/**
 * @class {Ratings}
 * @description { }
 * @description { }
 */
class Rating {
  /**
   * @description { check if a user is signed in }
   * @param { object } req object
   * @param { object } res object
   * @returns { boolean } true or false
   */
  static async queryUserRatings(req) {
    const { articleId } = req.params;
    const userId = req.user.payload.id;
    return Ratings.findAndCountAll({
      where: {
        userId,
        articleId
      }
    });
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } req object
   * @param { object } res object
   * @returns { boolean } true or false
   */
  static async queryArticle(req) {
    const { articleId } = req.params;
    return Article.findAndCountAll({
      where: {
        published: true,
        id: articleId,
      }
    });
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } req object
   * @param { object } res object
   * @returns { boolean } true or false
   */
  static async rateArticle(req, res) {
    const { articleId } = req.params;
    const userId = req.user.payload.id;
    const { rateValue } = req.body;
    if (rateValue > 5 || rateValue < 1) {
      return res.status(403).json({
        success: false,
        message: 'Rate value must be from 1 to 5'
      });
    }
    if (!rateValue) {
      return res.status(403).json({
        success: false,
        message: 'Please provide a rate value from 1 to 5'
      });
    }
    await Ratings.create({
      userId,
      articleId,
      ratings: rateValue,
    }).then(data => res.status(201).json({
      data,
      success: true,
      message: 'You successfully rated this article'
    }));
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } req object
   * @param { object } average object
   * @returns { boolean } true or false
   */
  static async updateArtilceRatings(req, average) {
    const { articleId } = req.params;
    Article.update({
      ratings: average
    }, {
      where: {
        id: articleId
      }
    });
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } req object
   * @param { object } res object
   * @returns { boolean } true or false
   */
  static async getArticleAverageRate(req, res) {
    const { articleId } = req.params;
    await Ratings.findAndCountAll({
      where: {
        articleId
      }
    }).then((data) => {
      if (data.count > 0) {
        Ratings.sum('ratings').then((sum) => {
          const average = (sum / data.count);
          this.updateArtilceRatings(req, average);
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

export default Rating;
