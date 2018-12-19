/* eslint-disable no-restricted-globals */
import model from '../db/models';
/**
 * @class { UserController }
 * @description { Handles Users Requests }
 */
class PaginatorController {
/**
  *
  * @param { object } req
  * @param { object } res
  * @returns { object } Json
  * @param { next } next
  */
  static page(req, res) {
  /**
     * @var {number} limit per page
     * @var {limit} offSet page skip
   */
    const { Article, User } = model;
    const { source, limit } = req.params;
    const page = parseInt(source, 10);
    const pageLimit = parseInt(limit, 10);
    if (page === 0 || page < 0) {
      return res.status(400).json({
        message: 'Page number must be numeric and greater than zero'
      });
    }
    if (page === '') {
      return res.status(400).json({
        message: 'Page number can not be empty'
      });
    }
    if (!page) {
      return res.status(400).json({
        message: 'Page number must be numeric and greater than zero'
      });
    }

    if (isNaN(page)) {
      return res.status(400).json({
        message: 'Page number must be numeric and greater than zero'
      });
    }
    const offset = (page - 1) * pageLimit;
    Article.findAndCountAll({
      pageLimit,
      offset,
      $sort: { id: 1 },
      order: [
        ['createdAt', 'ASC']
      ],
      where: {
        published: true
      },
      include: [{
        model: User, attributes: ['username', 'bio', 'avatarUrl']
      }]
    })
      .then((data) => {
        if (data.count === 0) {
          return res.status(404).json({
            success: 'Success',
            message: 'No articles yet, please try again later'
          });
        }
        const pages = Math.ceil(data.count / pageLimit);
        if (page > pages) return res.status(404).json({ message: 'Reached page limit...' });
        return res.status(200).json({
          result: data.rows,
          count: data.count,
          message: `${page} of ${pages}`
        });
      }).catch(error => res.status(500).json({
        error,
        message: 'Internal server error'
      }));
  }
}

export default PaginatorController;
