import appendAuthor from './appendAuthor';
import addTags from '../workers/TagWorker';
import issueToken from './issueToken';
import multifile from './multifile';
import buildQuery from './searchQueries';
import searchFor from './searchFor';
import sendMail from './sendMail';
import slugDecoder from './slugDecoder';
import templates from './templates';

export default {
  appendAuthor,
  addTags,
  issueToken,
  multifile,
  buildQuery,
  searchFor,
  sendMail,
  slugDecoder,
  templates,
};
