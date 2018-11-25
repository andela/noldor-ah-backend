import Models from '../db/models';

const {
  User, Article, Comment, Reply, ReportedComment, ReplyLike
} = Models;
/**
 * @class { CommentWorker }
 * @description { Handles comments }
 */
class CommentWorker {
  /**
  * @arg { id } id
  * @returns { object } user
  */
  static async confirmArticle(id) {
    const article = await Article.findByPk(id, {
      where: {
        published: true
      }
    });
    return article;
  }

  /**
  * @arg { id } id
  * @returns { object } user
  */
  static async confirmUser(id) {
    const user = await User.findByPk(id);
    return user;
  }

  /**
  * @arg { id } id
  * @returns { object } user
  */
  static async confirmComment(id) {
    const comment = await Comment.findByPk(id);
    return comment;
  }

  /**
  * @arg { id } id
  * @returns { object } user
  */
  static async getArticleComments(id) {
    const articleComments = await Comment.findAll({
      where: {
        articleId: id
      }
    });
    return articleComments;
  }

  /**
    * @arg { id } id
    * @returns { object } user
    */
  static async getCommentReplies(id) {
    const commentReplies = await Comment.findAll({
      where: {
        id
      },
      include: [
        {
          model: Reply,
          include: [
            {
              model: ReplyLike
            }
          ]
        }
      ]
    });
    return commentReplies;
  }

  /**
    * @arg { id } id
    * @returns { object } user
    */
  static async getReply(id) {
    const availableReply = await Reply.findByPk(id);
    return availableReply;
  }

  /**
   *
   * @param { Object } req
   * @param { Object } res
   * @returns { JSON } JSON
   */
  static async checkCommentExistence(req, res) {
    try {
      const article = await this.confirmArticle(req.params.articleId);
      if (!article) {
        res.status(404).json({
          success: false,
          message: 'Article does not exist',
        });
        return null;
      }
      if (article) {
        const comment = await this.confirmComment(req.params.commentId);
        if (!comment) {
          res.status(404).json({
            success: false,
            message: 'comment does not exist'
          });
          return null;
        }
      }
      return true;
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
   * @param { string } decision - blocked/resolved
   * @param { object } req
   * @param { object } res
   * @returns { JSON } JSON
   */
  static async updateCommentDecision(decision, req, res) {
    try {
      const { articleId, commentId } = req.params;
      const update = ReportedComment.update({
        status: decision
      }, {
        where: {
          articleId,
          commentId
        }
      });
      return update;
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
   * @returns { JSON } JSON
   */
  static async deleteBlockedComments(req, res) {
    const { articleId, commentId } = req.params;
    const deleted = await Comment.destroy({
      where: {
        articleId,
        id: commentId
      }
    });

    if (!deleted) {
      res.status(500).json({
        success: false,
        message: 'unable to delete comment'
      });
      return null;
    }
    return true;
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { JSON } JSON
   */
  static async getAcceptedComment(req, res) {
    try {
      const { articleId, commentId } = req.params;
      const acceptedComment = await ReportedComment.findOne({
        where: {
          articleId,
          commentId
        },
        attributes: ['acceptedComment']
      });
      const newComment = acceptedComment.dataValues.acceptedComment;
      if (newComment === null) {
        return null;
      }
      return newComment;
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

export default CommentWorker;
