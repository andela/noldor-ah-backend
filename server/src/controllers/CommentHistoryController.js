import httpResponse from '../helpers/httpResponse';
import CommentHistory from '../workers/CommentHistoryWorker';

const {
  getCommentHistory
} = CommentHistory;

const {
  goodResponse,
  badResponse
} = httpResponse;


/**
 * @class { CommentHistoryController }
 * @description { Handles Users Requests }
 */
class CommentHistoryController {
/**
  *
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  * @param { next } next
  */
  static async getCommentHistory(req, res) {
  /**
     * @var {number} limit per page
     * @var {limit} offSet page skip
   */
    try {
      const {
        commentId
      } = req.params;
      const commentHistory = await getCommentHistory(commentId);
      if (!commentHistory.length) {
        return badResponse(res, 404, 'Edit history not found');
      }
      return goodResponse(res, 200, 'Comment edit history', commentHistory);
    } catch (error) {
      return badResponse(res, 500, 'Internal server error', error.message);
    }
  }
}

export default CommentHistoryController;
