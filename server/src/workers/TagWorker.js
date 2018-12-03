import Models from '../db/models';

const { Tags } = Models;

/**
 * @class { TagWorker }
 * @description { Handles tag operations }
 */
class TagWorker {
  /**
   * @description { Add tags to the DB }
   * @param { object } tags
   * @param { object } article
   * @returns { null } nothing
   *
   */
  static async addTags(tags, article) {
    tags.forEach((entry) => {
      Tags.findOrCreate({
        where: { name: entry },
      })
        .spread((tag) => {
          const returnedTag = tag.get({ plain: true });
          article.addTags(returnedTag.id);
        });
    });
  }
}

export default TagWorker;
