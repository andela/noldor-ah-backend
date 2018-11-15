import ReportValidation from '../helpers/reportValidation';
import HttpResponseHelper from '../helpers/httpResponse';
import ReportWorker from '../workers/ReportWorker';

const { goodResponse, badResponse } = HttpResponseHelper;

/**
 * @class { ReportController }
 * @description { Implements report of articles functionality }
 */
class ReportController {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @return { object } JSON
     */
  static async reportArticle(req, res) {
    const error = ReportValidation.postValidation(req, res);
    if (error === null) {
      const makeReport = await ReportWorker.report(req, res);
      if (!makeReport) {
        return badResponse(res, 200, 'you have reported this article previously');
      }
      return goodResponse(res, 201, 'article has been reported');
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @return {*} JSON/String
 */
  static async getAllReports(req, res) {
    const reports = await ReportWorker.getReports(res);
    if (!reports) {
      return badResponse(res, 404, 'no report found');
    }

    return goodResponse(res, 200, '', reports);
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @return {*} JSON
   */
  static async reviewReport(req, res) {
    const error = ReportValidation.updateValidation(req, res);
    if (error === null) {
      const review = await ReportWorker.review(req, res);
      if (!review) {
        return badResponse(res, 404, 'report not found');
      }
      return goodResponse(res, 200, 'the report is resolved');
    }
  }
}

export default ReportController;
