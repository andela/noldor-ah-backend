import Models from '../db/models';

const { Article, sequelize } = Models;

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

    if (Object.keys(filters).length === 0 && filters.constructor === Object) {
      const q1 = 'SELECT "Articles".id, "Articles"."userId", "Articles".title, "Articles".description,  "Articles".content, ';
      const q2 = '"Articles".slug, "Articles"."featuredImg", "Articles"."createdAt", "Articles"."updatedAt" FROM "Articles" INNER JOIN "Users"';
      const q3 = ` ON "Articles"."userId" = "Users"."id" AND "Articles".published = 'TRUE' WHERE "Articles"."searchVectors" @@ to_tsquery('${searchTerm}')`;
      const q4 = 'ORDER BY "Articles"."createdAt" DESC';
      const query = `${q1}${q2}${q3}${q4}`;

      const results = {
        success: true,
        message: 'articles matching that search term found',
      };

      const response = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        model: Article,
      });

      results.articles = response;

      if (response.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            msg: 'no article with that search term found',
          },
        });
      }
      return res.status(200).json(results);
    }

    const q1 = 'SELECT "Articles".id, "Articles"."userId", "Articles".title, "Articles".description,  "Articles".content, "Articles".slug,';
    const q2 = ' "Articles"."featuredImg", "Articles"."createdAt", "Articles"."createdAt", "Articles"."updatedAt" FROM "Articles"';
    const q3 = ' INNER JOIN "Users" ON "Articles"."userId" = "Users"."id" AND "Articles".published = \'TRUE\' WHERE "Users"."username" =';
    const q4 = ` '${filters.author}' AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}')`;
    const q5 = 'ORDER BY "Articles"."createdAt" DESC';
    const query = `${q1}${q2}${q3}${q4}${q5}`;

    const results = {
      success: true,
      message: 'articles matching that search term found',
    };

    const response = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      model: Article,
    });

    results.articles = response;

    if (response.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          msg: 'no article with that search term found',
        },
      });
    }

    return res.status(200).json(results);
  }
}

export default SearchController;
