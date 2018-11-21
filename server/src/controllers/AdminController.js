import Models from '../db/models';
import ArticleWorker from '../workers/ArticleWorker';
import UserWorker from '../workers/UserWorker';
import Helpers from '../helpers/index';
import httpResponseHelper from '../helpers/httpResponse';

const { Category, User } = Models;
const { goodResponse, badResponse } = httpResponseHelper;
const { checkArticle } = ArticleWorker;

/**
 * @class { AdminController }
 * @description Handles All Admin Functionality
 */
class AdminController {
  /**
   * @description takedown an article
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async takedownArticle(req, res) {
    const article = await checkArticle(req, res);
    if (!article) {
      return badResponse(res, 404, 'article not found');
    }

    const articleOwner = await article.getUser().then(res => Helpers.format(res));
    let ownerName = `@${articleOwner.username}`;
    if (articleOwner.firstName) ownerName = articleOwner.firstName;

    const articleTakedown = Helpers.templates.articleTakedown(
      ownerName,
      article.dataValues.slug,
      article.dataValues.title
    );

    await article.update({ published: false });
    await Helpers.sendMail(
      articleOwner.email,
      'no-reply@authorshaven.com',
      'Policy Violation',
      articleTakedown
    );

    return goodResponse(res, 200, 'article taken down successfully');
  }

  /**
   * @description adds new categories
   * @param { object } req
   * @param { object } res
   * @returns { object } JSON
   */
  static async addCategory(req, res) {
    let { category: newCategory } = req.body;
    if (!newCategory) {
      return badResponse(res, 400, 'category field is required');
    }
    if (newCategory.trim().length < 3) {
      return badResponse(res, 400, 'category should be longer than 3 characters');
    }

    newCategory = newCategory.toLowerCase();

    const foundCategory = await Category.findOne({ where: { name: newCategory } });
    if (foundCategory) {
      return goodResponse(res, 409, 'category already exists');
    }

    const category = await Category.create({ name: newCategory });
    return goodResponse(res, 201, 'category created successfully', category);
  }

  /**
   * @description Deactivates a user profile only if authorized
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async deactivateUser(req, res) {
    const { username } = req.params;
    const findUser = await UserWorker.checkUsername(username);

    if (!findUser) {
      return badResponse(res, 404, 'user not found');
    }

    const deactivatedUser = Helpers.format(findUser);
    let userName = `@${deactivatedUser.username}`;
    if (deactivatedUser.firstName) userName = deactivatedUser.firstName;
    const profileTakedown = Helpers.templates.profileTakedown(userName);

    await findUser.update({ deactivatedByAdmin: true });
    await findUser.destroy();

    await Helpers.sendMail(
      deactivatedUser.email,
      'no-reply@authorshaven.com',
      'Your Account Has Been Deactivated',
      profileTakedown
    );

    return res.status(204).json({});
  }

  /**
   * @description reactivate a deactivated user
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async reactivateUser(req, res) {
    const { username } = req.params;
    const userExist = await User.findOne({
      where: { username },
      attributes: ['id', 'firstName', 'username', 'email'],
      paranoid: false
    });

    if (!userExist) {
      return badResponse(res, 404, 'user not found');
    }

    userExist.setDataValue('deletedAt', null);
    userExist.setDataValue('deactivatedByAdmin', false);
    await userExist.save({ paranoid: false });

    const reactivatedUser = Helpers.format(userExist);
    let userName = `@${reactivatedUser.username}`;
    if (reactivatedUser.firstName) userName = reactivatedUser.firstName;
    const profileReactivation = Helpers.templates.profileReactivation(userName);

    await Helpers.sendMail(
      reactivatedUser.email,
      'no-reply@authorshaven.com',
      'Your Account Has Been Reactivated',
      profileReactivation
    );

    return goodResponse(res, 200, 'user reactivated successfully');
  }
}

export default AdminController;
