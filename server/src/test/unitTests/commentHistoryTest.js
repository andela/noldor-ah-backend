// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import comment from '../integrationTests/commentTest';
// import CommentHistory from '../../workers/CommentHistoryWorker';
// import HistoryController from '../../controllers/CommentHistoryController';

// const { expect } = chai;
// chai.use(chaiHttp);

// const {
//   commentId
// } = comment;

// const {
//   getComment,
// } = CommentHistory;

// const { historyController } = HistoryController;

// describe('Unit testing comment history functionalities', () => {
//   it('should get a single comment', async () => {
//     const { id } = commentId;
//     try {
//       const getOneComment = await getComment(id);
//       expect(getOneComment).to.be.an('object');
//     } catch (error) {
//       throw (error);
//     }
//   });
//   it('should get a single comment history', async () => {
//     const { id } = commentId;
//     try {
//       const getEditHistory = await historyController(id);
//       expect(getOneComment).to.be.an('object');
//     } catch (error) {
//       throw (error);
//     }
//   });
// });
