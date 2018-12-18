import Sequelize from 'sequelize';
import Models from '../db/models';
import helpers from '../helpers';


const { Op } = Sequelize;

const { Article, Comment } = Models;


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
  static async getComments(req) {
    const id = await helpers.slugDecoder(req);
    try {
      const existingArticle = await Article.findOne({
        where: {
          slug: {
            [Op.like]: `%${id}`
          },
        }
      });
      if (!existingArticle) {
        return 'Article does not exist';
      }
      const availableComment = await this.getArticleComments(existingArticle.id);
      if (!availableComment.length) {
        return 'There are no comments yet...';
      }

      await Promise.all(availableComment.map(async (comment) => {
        const replies = await comment.getReplies();
        comment.dataValues.replies = replies.length;

        const likes = await comment.getCommentLikes();
        comment.dataValues.likes = likes.length;
      }));
      return availableComment;
    } catch (error) {
      return error.message;
    }
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
}

export default CommentController;
