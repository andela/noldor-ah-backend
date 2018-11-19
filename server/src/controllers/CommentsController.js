import Models from '../db/models';
import CommentWorker from '../workers/CommentWorker';

const { Comment, Article } = Models;

const {
  getArticleComments,
  confirmArticle,
  confirmUser
} = CommentWorker;

/**
 * @class { Comment Controller }
 * @description { Handles Users comments on articles }
 */
class CommentController {
  /**
  * @description { Gets all comments of an article }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async getComments(req, res) {
    try {
      const { articleId } = req.params;
      const existingArticle = await Article.findByPk(articleId);

      if (!existingArticle) {
        return res.status(404).json({
          success: false,
          message: 'Article does not exist'
        });
      }
      const availableComment = await getArticleComments(articleId);

      if (!availableComment.length) {
        return res.status(200).json({
          success: true,
          message: 'There are no comments...'
        });
      }
      await Promise.all(availableComment.map(async (comment) => {
        const replies = await comment.getReplies();
        comment.dataValues.replies = replies.length;
      }));
      return res.status(200).json({
        success: true,
        message: 'Comments retrieved successfully',
        data: availableComment
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
  * @description { Create comments }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async createComment(req, res) {
    try {
      const { comment } = req.body;
      const { articleId } = req.params;
      const userId = req.user.payload.id;

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const existingArticle = await confirmArticle(articleId);
      if (!existingArticle) {
        return res.status(404).json({
          success: false,
          message: 'Article does not exist'
        });
      }

      const postingComment = await Comment.create({
        userId,
        articleId,
        comment
      });
      return res.status(201).json({
        success: true,
        message: 'Comment has been posted successfully',
        data: postingComment
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
  * @description { Updates comments }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async updateComment(req, res) {
    try {
      const { articleId } = req.params;
      const { commentId } = req.params;
      const userId = req.user.payload.id;

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const existingArticle = await confirmArticle(articleId);
      if (!existingArticle) {
        return res.status(404).json({
          success: false,
          message: 'Article does not exist'
        });
      }

      const existingComment = await Comment.findByPk(commentId);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist'
        });
      }

      if (existingComment.id === commentId && existingComment.userId === userId) {
        const updatedComment = await existingComment.update(req.body, {
          fields: Object.keys(req.body)
        });
        return res.status(205).json({
          success: true,
          message: 'Edited',
          data: updatedComment
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
  * @description { Delete comments }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async deleteComment(req, res) {
    try {
      const { articleId } = req.params;
      const { commentId } = req.params;
      const userId = req.user.payload.id;

      const existingArticle = await confirmArticle(articleId);
      if (!existingArticle) {
        return res.status(404).json({
          success: false,
          message: 'Article does not exist'
        });
      }

      const existingUser = await confirmUser(userId);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const existingComment = await Comment.findByPk(commentId);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          message: 'Comment does not exist',
        });
      }

      if (existingComment.userId === userId) {
        await existingComment.destroy();
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

export default CommentController;
