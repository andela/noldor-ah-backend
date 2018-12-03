import Models from '../db/models';

const { Highlights, Comment, Article } = Models;

/**
 * @class { Highlight Controller }
 * @description { Handles Users highlights on articles }
 */
class HighlightController {
  /**
  * @description { Adds an highlight to an article }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async addHighlight(req, res) {
    const { articleId } = req.params;
    const article = await Article.findByPk(articleId);
    const userId = req.user.payload.id;
    const { highlight, comment } = req.body;
    let postedComment = '';

    try {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'article not found',
        });
      }

      const findHighlight = article.dataValues.content.indexOf(highlight); // check if highlight exists in the article
      if (findHighlight === -1) {
        return res.status(400).json({
          success: false,
          message: 'highlight not found in article'
        });
      }

      if (comment) {
        postedComment = await Comment.create({ userId, articleId, comment });
      }

      const postedHighlight = await Highlights.create({
        userId,
        articleId,
        commentId: postedComment.id,
        highlight
      });

      return res.status(200).json({
        success: true,
        message: 'article highlighted successfully',
        highlightId: postedHighlight.id
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
  * @description { Removes a highlight from an article }
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  */
  static async removeHighlight(req, res) {
    const userId = req.user.payload.id;
    const { articleId, highlightId } = req.params;
    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'article not found',
      });
    }

    if (article.dataValues.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'you are not authorized to perform this action'
      });
    }

    await Highlights.destroy({ where: { id: highlightId } });

    return res.status(200).json({
      success: true,
      message: 'highlight removed successfully'
    });
  }
}

export default HighlightController;
