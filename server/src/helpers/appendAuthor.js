import Models from '../db/models';

const { User } = Models;

const appendAuthor = async (array) => {
  await Promise.all(array.map(async (article) => {
    const author = await User.findByPk(article.userId)
      .then(res => JSON.parse(JSON.stringify(res)));
    article.author = {
      id: author.id,
      fullName: `${author.lastName} ${author.firstName}`,
      username: author.username,
    };
  }));
};

export default appendAuthor;
