import model from '../db/models';
/**
 * @class { UserController }
 * @description { Handles Users Requests }
 */
class Paginator {
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
<<<<<<< HEAD
     * @var {Users}
=======
>>>>>>>         feat(pagination): Pagination support for articles
   */
    const { Article } = model;
    const page = parseInt(req.params.source, 10);
    const limit = 3;
    if (page === 0 || page < 0) {
      return res.status(404).json({
        message: 'Page number must be numeric and greater than zero'
      });
    }
    if (!page) {
      return res.status(404).json({
        message: 'Page number must be numeric and greater than zero'
      });
    }
<<<<<<< HEAD
    let offset = page * limit;
=======
    const offset = (page - 1) * limit;
>>>>>>>         feat(pagination): Pagination support for articles
    Article.findAndCountAll({
      limit,
      offset,
      $sort: { id: 1 },
      order: [
        ['published', 'ASC']
      ]
    })
      .then((data) => {
        if (data.count === 0) {
          return res.status(404).json({
            success: 'Success',
            message: 'No articles yet, please try again later'
          });
        }
        const pages = Math.ceil(data.count / limit);
<<<<<<< HEAD
        offset = limit * (page - 1);
=======
        if (page > pages) return res.status(404).json({ message: 'Reached page limit...' });
>>>>>>>         feat(pagination): Pagination support for articles
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

export default Paginator;
