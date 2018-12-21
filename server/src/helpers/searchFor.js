import Models from '../db/models';

const { Article, sequelize } = Models;
const searchFor = async (query) => {
  const results = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    model: Article,
  }).then(res => JSON.parse(JSON.stringify(res)));

  return results;
};

export default searchFor;
