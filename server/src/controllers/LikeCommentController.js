import CommentQueries from '../workers/CommentQueries';
import LikeQueries from '../workers/likeQueries';
import HttpResponseHelper from '../helpers/httpResponse';

const {
  confirmUser,
  confirmComment,
  getReply
} = CommentQueries;

const {
  checkLikeComment,
  likeThisComment,
  removeLikeComment,
  likeThisReply,
  checkLikeReply,
  removeLikeReply
} = LikeQueries;

const {
  goodResponse,
  badResponse
} = HttpResponseHelper;

/**
 * @class { Like Comment Controller }
 * @description { Handles Users liking a comment }
 */
class LikeCommentsController {
  /**
  * @description { Like a comment }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async likeOrUnlikeComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.payload.id;

      const exitingUser = await confirmUser(userId);
      if (!exitingUser) {
        return badResponse(res, 404, 'User does not exist');
      }
      const existingComment = await confirmComment(commentId);
      if (!existingComment) {
        return badResponse(res, 404, 'Comment does not exist');
      }

      const existingLike = await checkLikeComment(userId, commentId);
      if (!existingLike) {
        await likeThisComment(userId, commentId);
        return goodResponse(res, 201, 'You like this comment');
      }
      if (existingLike.userId === userId) {
        await removeLikeComment(userId, commentId);
        return goodResponse(res, 200, 'You have unliked this comment');
      }
    } catch (error) {
      return badResponse(res, 500, error.message);
    }
  }

  /**
  * @description { Like a reply }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async likeOrUnlikeReply(req, res) {
    try {
      const userId = req.user.payload.id;
      const { replyId } = req.params;

      const exitingUser = await confirmUser(userId);
      if (!exitingUser) {
        return badResponse(res, 404, 'User does not exist');
      }
      const existingComment = await getReply(replyId);
      if (!existingComment) {
        return badResponse(res, 404, 'Reply does not exist');
      }

      const existingLike = await checkLikeReply(userId, replyId);
      if (!existingLike) {
        await likeThisReply(userId, replyId);
        return goodResponse(res, 201, 'You like this reply');
      }
      if (existingLike.userId === userId) {
        await removeLikeReply(userId, replyId);
        return goodResponse(res, 200, 'You have unliked this reply');
      }
    } catch (error) {
      return badResponse(res, 500, error.message);
    }
  }
}

export default LikeCommentsController;
