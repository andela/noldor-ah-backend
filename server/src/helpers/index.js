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
};
