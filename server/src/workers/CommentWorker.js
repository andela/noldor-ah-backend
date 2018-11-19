import Models from '../db/models';

const {
  User, Article, Comment, Reply
} = Models;
/**
 * @class { CommentWorker }
 * @description { Handles for like and unlike }
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
          model: Reply
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
}

export default CommentWorker;
