import models from '../db/models/index';

// console.log(models.CommentHistory);

const {
  Comment,
  CommentHistory
} = models;

/**
 * @class { Like Comment Controller }
 * @description { Handles Users liking a comment }
 */
class CommentHistoryWorker {
  /**
   * @description { Create a comment edit history }
   * @param { object } userId
   * @param { object } commentId
   * @param { object } comment
   * @returns { object } createHistory
   */
  static async createCommentHistory(userId, commentId, comment) {
    const createHistory = await CommentHistory.create({
      userId,
      commentId,
      comment
    });
    return createHistory;
  }

  /**
   * @description { Get comment }
   * @param { object } id
   * @returns { object } comment
   */
  static async getComment(id) {
    const comment = await Comment.findOne({
      where: {
        id
      }
    });
    return comment;
  }

  /**
   * @description { Get comment edit history }
   * @param { object } commentId
   * @returns { object } CommentHistoryWorker
   */
  static async getCommentHistory(commentId) {
    const commentHistory = await CommentHistory.findAll({
      where: {
        commentId
      }
    });
    return commentHistory;
  }
}

export default CommentHistoryWorker;
