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
      const q1 = 'SELECT "Articles".id, "Articles"."userId", "Articles".title';
      const q2 = ', "Articles".description,  "Articles".content, ';
      const q3 = '"Articles".slug, "Articles"."featuredImg", "Articles"."createdAt",';
      const q4 = ' "Articles"."updatedAt" FROM "Articles" INNER JOIN "Users"';
      const q5 = ' ON "Articles"."userId" = "Users"."id" AND "Articles".published = \'TRUE\'';
      const q6 = ` WHERE "Articles"."searchVectors" @@ to_tsquery('${searchTerm}')`;
      const q7 = 'ORDER BY "Articles"."createdAt" DESC';
      const query = `${q1}${q2}${q3}${q4}${q5}${q6}${q7}`;

      const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        model: Article,
      });

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            msg: 'no article with that search term found',
          },
        });
      }
      return res.status(200).json(results);
    }

    const q1 = 'SELECT "Articles".id, "Articles"."userId", "Articles".title,';
    const q2 = ' "Articles".description, "Articles".content, "Articles".slug,';
    const q3 = ' "Articles"."featuredImg", "Articles"."createdAt", ';
    const q4 = '"Articles"."createdAt", "Articles"."updatedAt" FROM "Articles"';
    const q5 = ' INNER JOIN "Users" ON "Articles"."userId" = "Users"."id" AND ';
    const q6 = '"Articles".published = \'TRUE\' WHERE "Users"."username" =';
    const q7 = ` '${filters.author}' AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}')`;
    const q8 = 'ORDER BY "Articles"."createdAt" DESC';
    const query = `${q1}${q2}${q3}${q4}${q5}${q6}${q7}${q8}`;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      model: Article,
    });

    if (results.length === 0) {
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
