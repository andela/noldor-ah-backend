import ReportValidation from '../helpers/reportValidation';
import HttpResponseHelper from '../helpers/httpResponse';
import ReportWorker from '../workers/ReportWorker';
import CommentWorker from '../workers/CommentQueries';

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
      if (makeReport === 'not found') {
        return badResponse(res, 404, 'article not found');
      }
      if (makeReport) {
        return goodResponse(res, 201, 'article has been reported');
      }
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

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns { JSON } json
   */
  static async reportComment(req, res) {
    try {
      const existingComment = await CommentWorker.checkCommentExistence(req, res);
      if (existingComment) {
        const error = ReportValidation.postValidation(req, res);
        if (!error) {
          const makeReport = await ReportWorker.reportComment(req, res);
          if (makeReport) {
            return res.status(200).json({
              success: true,
              message: 'Comment has been reported',
            });
          }
        }
      }
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
   *
   * @param { Object } req
   * @param { Object } res
   * @returns { JSON } JSON
   */
  static async resolveCommentIssues(req, res) {
    try {
      const { articleId, commentId } = req.params;
      const existingComment = await CommentWorker.checkCommentExistence(req, res);
      if (existingComment) {
        const { decision } = req.body;
        if (decision === 'blocked') {
          const deleteComment = await CommentWorker.deleteBlockedComments(req, res);
          await CommentWorker.updateCommentDecision(decision, req, res);
          if (deleteComment) {
            return res.status(200).json({
              success: true,
              message: 'Comment has been deleted'
            });
          }
        }
        if (decision === 'resolved') {
          const acceptedComment = await CommentWorker.getAcceptedComment(req, res);
          if (!acceptedComment) {
            return res.status(404).json({
              success: false,
              message: 'this user needs to provide acceptable comment for issues to be resolved',
            });
          }
          if (acceptedComment) {
            const acpComment = acceptedComment;
            const update = await ReportWorker.updateComment(acpComment, commentId, articleId, res);
            await CommentWorker.updateCommentDecision(decision, req, res);
            if (update) {
              return res.status(200).json({
                success: true,
                message: 'Issue has been resolved'
              });
            }
          }
        }
      }
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
   * @param { object } req
   * @param { object } res
   * @returns { json } Json
   */
  static async editReportedComment(req, res) {
    try {
      const existingComment = await CommentWorker.checkCommentExistence(req, res);
      if (existingComment) {
        const ammendComment = await ReportWorker.editComment(req, res);
        if (!ammendComment) {
          return res.status(401).json({
            success: false,
            message: 'you can only edit your comment'
          });
        }
        if (ammendComment) {
          return res.status(200).json({
            success: true,
            message: 'comment added and currently on review'
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { Json } JSON
   */
  static async getCommentReports(req, res) {
    const { status } = req.query;
    const foundComment = await ReportWorker.findCommentByStatus(status, res);
    if (!foundComment) {
      return res.status(404).json({
        success: false,
        message: `There are no ${status} reports`,
      });
    }
    if (foundComment) {
      return res.status(200).json({
        success: true,
        message: `All ${status} comments`,
        foundComment,
      });
    }
  }
}

export default ReportController;
