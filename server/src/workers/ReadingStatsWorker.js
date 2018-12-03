import models from '../db/models/index';
import httpResponse from '../helpers/response';

const {
  Article,
  ReadingStats,
} = models;

/**
 * @class { @ }
 * @description { Creation of Users reading statistics }
 */
class ReadingStatsWorker {
  /**
   * @description { A function that the details of an article from the database }
   * @param { object } id
   * @param { object } res
   * @returns { object } getArticle
   */
  static async getArticleDetails(id, res) {
    const getArticle = await Article.findOne({
      where: {
        id
      },
      attributes: ['id']
    });
    if (!getArticle) {
      return httpResponse.badResponse(res, 404, `Article with ID ${id} not found`);
    }
    return getArticle;
  }

  /**
   * @description { A function that the details of an article from the database }
   * @param { object } userId
   * @param { object } res
   * @returns { object } getArticle
   */
  static async getUserReadingStats(userId, res) {
    const user = await ReadingStats.findAndCountAll({
      where: {
        userId
      }
    });
    if (!user) {
      return httpResponse.badResponse(res, 404, `Article with ID ${userId} not found`);
    }
    return user;
  }

  /**
   * @description { A function that post reading stats to the database }
   * @param { object } userId
   * @param { object } articleId
   * @param { object } ratings
   * @returns { object } createStats
   */
  static async createReadingsStats(userId, articleId, ratings) {
    const createStats = await ReadingStats.create({
      userId,
      articleId,
      ratings
    });
    return createStats;
  }
}

export default ReadingStatsWorker;
