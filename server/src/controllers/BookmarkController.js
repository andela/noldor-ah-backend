import BookmarkWorker from '../workers/BookmarkWorker';

/**
 * @class { Bookmark class }
 */
class BookmarkController {
  /**
     *
     * @param { object } req
     * @param { object } res
     * @returns { JSON } json
     */
  static async addBookmark(req, res) {
    const userId = req.user.payload.id;
    const addBookmark = await BookmarkWorker.insert(userId, req, res);
    if (addBookmark) {
      return res.status(200).json({
        success: true,
        message: 'Article has been bookmarked'
      });
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns {JSON } JSON
   */
  static async getBookmark(req, res) {
    const userId = req.user.payload.id;
    const userBookmarks = await BookmarkWorker.getUserBookmarkByDates(userId, res);
    if (userBookmarks) {
      return res.status(200).json({
        success: true,
        message: 'successfully retrieved user\'s bookmarked articles',
        userBookmarks
      });
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { JSON } json
   */
  static async removeBookmark(req, res) {
    const userId = req.user.payload.id;

    const removedBookmark = await BookmarkWorker.remove(userId, req, res);
    if (removedBookmark) {
      return res.status(200).json({
        success: true,
        message: 'successfully removed bookmark',
      });
    }
  }
}

export default BookmarkController;
