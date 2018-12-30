/* eslint-disable no-restricted-globals */
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
    if (!rateValue || isNaN(parseInt(rateValue, 10))) {
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
      success: true,
      message: 'You successfully rated this article',
      data
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
    await Article.update({
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
  static async getArticleAverageRate(req) {
    const { articleId } = req.params;
    await Ratings.findAndCountAll({
      where: {
        articleId
      }
    }).then(async (data) => {
      if (data.count > 0) {
        await Ratings.sum('ratings', { where: { articleId } }).then(async (sum) => {
          const average = (sum / data.count);
          await Rating.updateArtilceRatings(req, average);
        });
      }
    });
  }

  /**
   * @description { get user article rating }
   * @param { object } userId
   * @param { object } articleId
   * @returns { Object } rateValue
   */
  static async getUserRating(userId, articleId) {
    const rateValue = await Ratings.findOne({
      where: {
        userId,
        articleId
      }
    });
    if (!rateValue) return null;
    return rateValue;
  }
}

export default Rating;
