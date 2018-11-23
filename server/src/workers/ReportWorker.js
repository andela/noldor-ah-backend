import Sequelize from 'sequelize';
import Models from '../db/models';
import Helpers from '../helpers/index';
import HttpResponseHelper from '../helpers/httpResponse';
import CommentWorker from './CommentQueries';

const { badResponse } = HttpResponseHelper;

const { Op } = Sequelize;
const {
  User, Article, Report, ReportedComment, Comment
} = Models;

/**
 * @class { ReportWorker }
 * @description { report worker }
 */
class ReportWorker {
  /**
     *@description { report  }
     * @param {object} req
     * @param {object} res
     * @return { object } JSON
     */
  static async report(req, res) {
    // use check Article worker
    const id = await Helpers.slugDecoder(req);
    const article = await Article.findOne({
      where: {
        slug: {
          [Op.like]: `%${id}`
        },
        published: true
      }
    });
    if (!article) {
      return badResponse(res, 404, 'article not found');
    }
    try {
      const userId = req.user.payload.id;
      const articleId = article.dataValues.id;
      const { reportType, reportDetail } = req.body;
      const findReport = await Report.findOne({
        where: {
          userId,
          articleId,
          reportType
        }
      });
      if (!findReport) {
        const addReport = await Report.create({
          userId, articleId, reportType, reportDetail, status: 'pending'
        });
        if (addReport) {
          return addReport;
        }
      }
      return null;
    } catch (error) {
      return badResponse(res, 500, '', error.message);
    }
  }

  /**
   *
   * @param {object} res
   * @return { object } JSON
   */
  static async getReports(res) {
    try {
      const getAllReports = await Report.findAll({
        attributes: ['id', 'articleId', 'reportType', 'reportDetail', 'status'],
        include: [
          {
            model: User, attributes: ['username'],
          },
          {
            model: Article, attributes: ['title'],
          }]
      });
      if (!getAllReports.length) {
        return null;
      }
      if (getAllReports.length) {
        const allReport = [];
        getAllReports.map((x) => {
          const {
            id: reportId, articleId, reportType, reportDetail: details, status
          } = x;
          const { username: reportedBy } = x.User;
          const articleTitle = x.Article.title;
          const aReport = {
            reportId, articleId, articleTitle, reportType, details, reportedBy, status
          };
          return allReport.push(aReport);
        });
        return allReport;
      }
    } catch (error) {
      return badResponse(res, 500, '', error.message);
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @return {*} JSON
   */
  static async review(req, res) {
    const id = req.params.reportId;
    try {
      const { comment } = req.body;
      const report = await Report.findByPk(id);
      if (!report) {
        return null;
      }
      if (report) {
        const reviewReport = await Report.update({
          status: 'resolved',
          comment
        },
        {
          where: { id }
        });
        if (reviewReport) {
          return true;
        }
      }
    } catch (error) {
      return badResponse(res, 500, '', error.message);
    }
  }

  /**
   * @param { sting } displayMessage
   * @param { uuid } commentId
   * @param { uuid } articleId
   * @param { object } res
   * @returns { object } object
   */
  static async updateComment(displayMessage, commentId, articleId, res) {
    try {
      const update = await Comment.update({
        comment: displayMessage,
      }, {
        where: {
          id: commentId,
          articleId
        }
      });
      return update;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
   *
   * @param { Object } req
   * @param { Object } res
   * @returns { JSON } JSON
   */
  static async reportComment(req, res) {
    try {
      const userId = req.user.payload.id;
      const { articleId, commentId } = req.params;
      const { reportType, reportDetail } = req.body;
      const comment = await CommentWorker.confirmComment(commentId);
      const initialComment = comment.dataValues.comment;
      let { displayMessage } = req.body;
      if (!displayMessage) {
        displayMessage = 'This content has been temporarily blocked';
      }
      const existingReport = await ReportedComment.findOne({
        where: {
          commentId,
          status: 'pending',
        }
      });

      if (existingReport) {
        res.status(200).json({
          success: false,
          message: 'This comment is currently under review'
        });
        return null;
      }
      const addCommentReport = await ReportedComment.create({
        userId, articleId, commentId, reportType, reportDetail, initialComment, displayMessage,
      });

      if (!addCommentReport) {
        res.status(200).json({
          success: false,
          message: 'Unable to report comment. Please try again'
        });
        return null;
      }
      const updateComment = await this.updateComment(displayMessage, commentId, articleId);
      return updateComment;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   *
   * @param { uuid } commentId
   * @param { object } res
   * @returns { string } username
   */
  static async findCommentUser(commentId, res) {
    try {
      const comment = await Comment.findOne({
        where: {
          id: commentId,
        }
      });
      if (!comment) {
        res.status(404).json({
          success: false,
          message: 'comment not exist'
        });
        return null;
      }

      if (comment) {
        const { userId } = comment.dataValues;
        const username = await User.findOne({
          where: {
            id: userId,
          },
          attributes: ['username']
        });
        if (!username) {
          res.status(404).json({
            success: false,
            message: 'user does not exist'
          });
          return null;
        }
        if (username) {
          return username.dataValues.username;
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
   *
   * @param { object } req
   * @param { object } res
   * @returns { json } json
   */
  static async editComment(req, res) {
    try {
      const { articleId, commentId } = req.params;
      const { acceptedComment } = req.body;
      const currentLoggedInUser = req.user.payload.username;
      const commentOwner = await this.findCommentUser(commentId, res);
      if (currentLoggedInUser !== commentOwner) {
        return null;
      }
      if (currentLoggedInUser === commentOwner) {
        const updateAcceptedComment = await ReportedComment.update({
          acceptedComment
        }, {
          where: {
            articleId,
            commentId
          }
        });
        return updateAcceptedComment;
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
   *
   * @param { object } status
   * @param { object } res
   * @returns { json } json
   */
  static async findCommentByStatus(status, res) {
    try {
      const found = await ReportedComment.findAll({
        where: {
          status,
        }
      });
      if (!found.length) {
        return null;
      }
      return found;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }
}
export default ReportWorker;
