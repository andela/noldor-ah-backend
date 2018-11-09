import ReactionHelper from '../helpers/reaction';

/**
 * @class { ReactionController}
 * @description { Controller class for user like and unlike reaction}
 *
 */
class ReactionController {
  /**
     * @description { Handles like and unlike reaction}
     * @param { object } req
     * @param { object } res
     * @return { object } JSON
     */
  static async likeArticle(req, res) {
    const check = await ReactionHelper.findArticle(req, res);
    if (check.status === true) {
      try {
        const removeLike = await check.article.removeUsers(req.user.payload.id);

        if (removeLike) {
          res.status(204).json('deleted');
          return null;
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: {
            msg: error.message,
          }
        });
      }
    }

    if (check.status === false) {
      try {
        const addLike = check.article.addUsers(req.user.payload.id);
        if (addLike) {
          return res.status(201).json({
            success: true,
            message: 'article has been liked'
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: {
            msg: error.message,
          }
        });
      }
    }
  }
}

export default ReactionController;
