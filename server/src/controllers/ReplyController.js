import Models from '../db/models';
import CommentWorker from '../workers/CommentWorker';

const { Reply } = Models;

const {
  confirmComment,
  confirmUser,
  getCommentReplies,
  getReply
} = CommentWorker;

/**
 * @class { Reply to a Comment Controller }
 * @description { Handles Users replies on comments }
 */
class ReplyController {
  /**
  * @description { Create a reply }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async createReply(req, res) {
    try {
      const { reply } = req.body;
      const { commentId } = req.params;
      const userId = req.user.payload.id;

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const existingComment = await confirmComment(commentId);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist'
        });
      }

      const postReply = await Reply.create({
        userId,
        commentId,
        reply
      });
      return res.status(201).json({
        success: true,
        message: 'Reply has been posted successfully',
        data: postReply
      });
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
  * @description { Gets all replies for a comment }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async getAllReplies(req, res) {
    try {
      const { commentId } = req.params;
      const availableComment = await confirmComment(commentId);
      if (!availableComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist'
        });
      }
      const availableReplies = await getCommentReplies(commentId);
      if (!availableReplies[0].Replies.length) {
        return res.status(200).json({
          success: true,
          message: 'There are no replies...'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Replies retrieved successfully',
        data: availableReplies
      });
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
  * @description { Updating replies made }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async updateReply(req, res) {
    try {
      const { commentId } = req.params;
      const { replyId } = req.params;
      const userId = req.user.payload.id;
      const { reply } = req.body;

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const checkComment = await confirmComment(commentId);
      if (!checkComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist'
        });
      }
      const checkReply = await getReply(replyId);
      if (!checkReply) {
        return res.status(404).json({
          success: false,
          message: 'Reply does not exist'
        });
      }
      if (checkReply.userId === userId) {
        const editReply = await checkReply.update({
          reply
        });
        return res.status(205).json({
          success: true,
          message: 'Edited',
          data: editReply
        });
      }

      return res.status(401).json({
        success: false,
        message: 'You are not authorized to do this',
      });
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
  * @description { Gets all replies for a comment }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async deleteReply(req, res) {
    try {
      const { commentId } = req.params;
      const { replyId } = req.params;
      const userId = req.user.payload.id;

      const checkComment = await confirmComment(commentId);
      if (!checkComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist'
        });
      }

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const checkReply = await getReply(replyId);
      if (!checkReply) {
        return res.status(404).json({
          success: false,
          message: 'Reply does not exist'
        });
      }

      if (checkReply.userId === userId) {
        await checkReply.destroy();
        return res.status(204).json();
      }

      return res.status(401).json({
        success: false,
        message: 'You are not authorized to do this',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }
}

export default ReplyController;
