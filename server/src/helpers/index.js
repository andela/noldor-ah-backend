import addTags from '../workers/TagWorker';
import ArticleValidation from './articleValidation';
import issueToken from './issueToken';
import multifile from './multifile';
import RatingHelper from './articleRatings';
import sendMail from './sendMail';
import slugDecoder from './slugDecoder';
import articleRatings from './articleRatings';
import templates from './templates';


export default {
  addTags,
  issueToken,
  multifile,
  RatingHelper,
  sendMail,
  slugDecoder,
  articleRatings,
  templates,
  ArticleValidation
};
