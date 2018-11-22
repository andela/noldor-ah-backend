import Models from '../db/models';

const {
  CommentLike,
  ReplyLike
} = Models;

/**
 * @class { Like Queries }
 * @description { Handles for like and unlike  for Comments }
 */
class LikeQueries {
  /**
  * @arg { userId } userId
  * @arg { commentId } commentId
  * @returns { object } user
  */
  static async likeThisComment(userId, commentId) {
    const likeComment = await CommentLike.create({
      userId,
      commentId
    });
    return likeComment;
  }

  /**
  * @arg { userId } userId
  * @arg { commentId } commentId
  * @returns { object } user
  */
  static async checkLikeComment(userId, commentId) {
    const checkIfLike = await CommentLike.findOne({
      where: {
        userId,
        commentId
      }
    });
    return checkIfLike;
  }

  /**
  * @arg { userId } userId
  * @arg { commentId } commentId
  * @returns { object } user
  */
  static async removeLikeComment(userId, commentId) {
    const unlikeComment = await CommentLike.destroy({
      where: {
        userId,
        commentId
      }
    });
    return unlikeComment;
  }

  /**
  * @arg { userId } userId
  * @arg { commentId } replyId
  * @returns { object } user
  */
  static async likeThisReply(userId, replyId) {
    const likeReply = await ReplyLike.create({
      userId,
      replyId
    });
    return likeReply;
  }

  /**
  * @arg { userId } userId
  * @arg { commentId } replyId
  * @returns { object } user
  */
  static async checkLikeReply(userId, replyId) {
    const checkIfLikeReply = await ReplyLike.findOne({
      where: {
        userId,
        replyId
      }
    });
    return checkIfLikeReply;
  }

  /**
  * @arg { userId } userId
  * @arg { commentId } replyId
  * @returns { object } user
  */
  static async removeLikeReply(userId, replyId) {
    const unlikeReply = await ReplyLike.destroy({
      where: {
        userId,
        replyId
      }
    });
    return unlikeReply;
  }
}

export default LikeQueries;
