import appendAuthor from './appendAuthor';
import addTags from '../workers/TagWorker';
import ArticleValidation from './articleValidation';
import issueToken from './issueToken';
import multifile from './multifile';
import buildQuery from './searchQueries';
import searchFor from './searchFor';
import sendMail from './sendMail';
import slugDecoder from './slugDecoder';
import articleRatings from './articleRatings';
import templates from './templates';
import format from './format';
import ReportValidation from './reportValidation';
import decodePassword from './hashPassword';
import roleDefinition from './defineRole';
import UserHelper from './user';
import httpResponseHelper from './httpResponse';
import NotificationHelper from './notification';


export default {
  appendAuthor,
  addTags,
  issueToken,
  multifile,
  buildQuery,
  searchFor,
  sendMail,
  slugDecoder,
  articleRatings,
  templates,
  ArticleValidation,
  format,
  ReportValidation,
  decodePassword,
  roleDefinition,
  UserHelper,
  httpResponseHelper,
  NotificationHelper
};
