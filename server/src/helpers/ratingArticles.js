import models from '../db/models';

const { Article, Ratings } = models;
/**
 * @class { RatingHelper }
 * @description { }
 * @description { }
 */
class RatingHelper {
  /**
   * @description { check if a user is signed in }
   * @param { articleId } articleId UUID
   * @param { published } published UUID
   * @returns { object } true or false
   */
  static async queryArticle(articleId, published = true) {
    const articleEntry = await Article.findAndCountAll({
      where: {
        published,
        id: articleId,
      }
    });
    if (articleEntry.count < 1) {
      return false;
    }
    return articleEntry;
  }

  /**
   * @description { check if a user is signed in }
   * @param { userId } userId UUID
   * @param { articleId } articleId UUID
   * @returns { object } true or false
   */
  static async queryUserRatings(userId, articleId) {
    const hasUserRated = await Ratings.findAndCountAll({
      where: {
        userId,
        articleId
      }
    });
    return hasUserRated;
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } userId UUID
   * @param { object } articleId UUID
   * @param { boolean } ratings boolean
   * @returns { promises } rateArticle
   */
  static async rateArticle(userId, articleId, ratings) {
    const rateArticle = await Ratings.create({
      userId,
      articleId,
      ratings
    });
    return rateArticle;
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } ratings object
   * @returns { object } rateStar
   */
  static async getAllRatedArticles(ratings) {
    const rateStar = await Ratings.findAll({
      where: {
        ratings
      }
    });
    return rateStar;
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } ratings object
   * @returns { object } object
   */
  static async getRateSum(ratings) {
    const rateSum = await Ratings.sum(ratings);
    return rateSum;
  }

  /**
   * @description { check if a user is signed in }
   * @param { object } articleId object
   * @returns { object } object
   */
  static async getArticleAverageRate(articleId) {
    const getAverageRate = await Ratings.findAndCountAll({
      where: {
        articleId
      }
    });
    return getAverageRate;
  }
}

export default RatingHelper;
