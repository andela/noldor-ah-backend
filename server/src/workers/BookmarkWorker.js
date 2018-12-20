import Models from '../db/models';
import ArticleWorker from './ArticleWorker';


const {
  Bookmark,
  Article, User
} = Models;

/**
 * @class { Bookmark class }
 * @description { Handles add and deleting bookmarks }
 */
class Bookmarkworker {
  /**
     *
     * @param { object } userId
     * @param { object } req
     * @param { object } res
     * @returns { JSON/BOOLEAN } json/boolean
     */
  static async insert(userId, req, res) {
    try {
      const existingArticle = await ArticleWorker.checkArticle(req, res);
      if (!existingArticle) {
        res.status(404).json({
          success: false,
          message: 'Article not found',
        });
        return null;
      }
      const articleId = existingArticle.id;
      const existingBookmarkByUser = await this.checkBookmarkExistence(userId, articleId, res);

      if (existingBookmarkByUser) {
        res.status(200).json({
          success: false,
          message: 'You already bookmarked this article',
        });
        return null;
      }
      const insertBookmark = await Bookmark.create({
        userId,
        articleId,
      });
      return insertBookmark;
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
   * @param { object } userId
   * @param { object } articleId
   * @param { object} res
   * @returns { JSON/BOOLEAN } json/boolean
   */
  static async checkBookmarkExistence(userId, articleId, res) {
    try {
      const existingBookmark = await Bookmark.findOne({
        where: {
          userId,
          articleId,
        }
      });
      if (existingBookmark) {
        return true;
      }
      return false;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   *
   * @param { object } userId
   * @param { object } res
   * @returns { JSON/BOOLEAN } json/boolean
   */
  static async getUserBookmarkByDates(userId, res) {
    try {
      const userBookmarks = await Bookmark.findAll({
        where: {
          userId
        },
        include: [
          {
            model: Article,
            include: {
              model: User, attributes: ['username']
            }
          },

        ],
        order: [['updatedAt', 'DESC']]
      });
      if (!userBookmarks.length) {
        res.status(404).json({
          success: false,
          message: 'You have no bookmark',
        });
        return null;
      }
      return userBookmarks;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   *
   * @param { object } userId
   * @param { object } req
   * @param { object } res
   * @returns {JSON/BOOLEAN } json/boolean
   */
  static async remove(userId, req, res) {
    try {
      const existingArticle = await ArticleWorker.checkArticle(req, res);
      if (!existingArticle) {
        res.status(404).json({
          success: false,
          message: 'Article not found',
        });
        return null;
      }
      const articleId = existingArticle.id;

      const removeBookmark = await Bookmark.destroy({
        where: {
          userId,
          articleId
        }
      });
      if (!removeBookmark) {
        res.status(404).json({
          success: false,
          message: 'This article is not bookmarked.'
        });
        return null;
      }

      return removeBookmark;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }
}

export default Bookmarkworker;
