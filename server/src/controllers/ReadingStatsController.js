import ReadingStatsWorker from '../workers/ReadingStatsWorker';
import httpResponse from '../helpers/response';

const { getUserReadingStats } = ReadingStatsWorker;


/**
 * @class { ReadingStatsController }
 * @description { Handles Reading stats GET Requests }
 */
class ReadingStatsController {
  /**
   * @description { Get all articles read by a specific user }
   * @param { object } req
   * @param { object } res
   *@return { object } statistics
   */
  static async getReadingStatistics(req, res) {
    const userId = req.user.payload.id;
    const statistics = await getUserReadingStats(userId, res);
    if (!statistics) {
      return httpResponse.badResponse(res, 404, 'Statistics not found');
    }
    return httpResponse.goodResponse(res, 200, { 'Number of articles read': statistics.count });
  }
}

export default ReadingStatsController;
