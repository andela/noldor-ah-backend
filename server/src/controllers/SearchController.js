import Helpers from '../helpers/index';

/**
 * @class { SearchController }
 * @description { Handles All Search Requests }
 */
class SearchController {
  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { object } Json
   */
  static async search(req, res) {
    const { keywords } = req.body;
    const filters = req.query;
    const searchTerm = keywords.split(' ').join(',');
    const response = {
      success: true,
      message: 'articles matching that search term found',
    };
    const failureResponse = {
      success: false,
      error: {
        msg: 'no article with that search term found',
      },
    };

    if (Object.keys(filters).length === 0 && filters.constructor === Object) { // no filters
      const query = Helpers.buildQuery(null, null, searchTerm);
      const results = await Helpers.searchFor(query);

      if (results.length === 0) return res.status(404).json(failureResponse);

      await Helpers.appendAuthor(results);
      response.articles = results;

      return res.status(200).json(response);
    }

    if (filters.tags && !filters.author) { // filter by tags only
      const query = Helpers.buildQuery(filters.tags, null, searchTerm);
      const results = await Helpers.searchFor(query);

      if (results.length === 0) return res.status(404).json(failureResponse);

      await Helpers.appendAuthor(results);
      response.articles = results;

      return res.status(200).json(response);
    }

    if (filters.author && !filters.tags) { // filter by author only
      const query = Helpers.buildQuery(null, filters.author, searchTerm);
      const results = await Helpers.searchFor(query);

      if (results.length === 0) return res.status(404).json(failureResponse);

      await Helpers.appendAuthor(results);
      response.articles = results;

      return res.status(200).json(response);
    }

    if (filters.author && filters.tags) { // filter by both tags and author
      const query = Helpers.buildQuery(filters.tags, filters.author, searchTerm);
      const results = await Helpers.searchFor(query);

      if (results.length === 0) return res.status(404).json(failureResponse);

      await Helpers.appendAuthor(results);
      response.articles = results;

      return res.status(200).json(response);
    }
  }
}

export default SearchController;
