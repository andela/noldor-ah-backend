import Sequelize from 'sequelize';
import Models from '../db/models';
import Helpers from '../helpers/index';
import HttpResponseHelper from '../helpers/httpResponse';

const { badResponse } = HttpResponseHelper;

const { Op } = Sequelize;
const { User, Article, Report } = Models;

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
}
export default ReportWorker;
