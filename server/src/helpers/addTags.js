import Models from '../db/models';

const { Tags } = Models;

const addTags = async (tags, article) => {
  tags.forEach((entry) => {
    Tags.findOrCreate({
      where: { name: entry },
    })
      .spread((tag) => {
        const returnedTag = tag.get({ plain: true });
        article.addTags(returnedTag.id);
      });
  });
};

export default addTags;
