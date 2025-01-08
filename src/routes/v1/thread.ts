import express, { Request, Response } from 'express';
import * as threadController from '../../controllers/threadController';
import { authentication } from '../../middlewares/authmiddleware';
import upload from '../../middlewares/uploadfile';
const threadRoute = express.Router();

threadRoute.get('/', authentication, threadController.showThreads);
threadRoute.get(
  '/profile/:username',
  authentication,
  threadController.showThreadsbyUsername,
);
threadRoute.get('/:id', authentication, threadController.showThreadsbyId);
threadRoute.post(
  '/create',
  authentication,
  upload.single('image'),
  threadController.createThread,
);
threadRoute.put(
  '/:id/edit',
  authentication,
  upload.single('image'),
  threadController.updateThread,
);
threadRoute.delete(
  '/delete/:id',
  authentication,
  threadController.deleteThread,
);
threadRoute.post('/:id/like', authentication, threadController.likeThread);
threadRoute.get('/:id/comment', authentication, threadController.showComments);
threadRoute.post(
  '/:id/addcomment',
  authentication,
  upload.single('image'),
  threadController.addComment,
);
threadRoute.delete(
  '/:threadId/comment/:commentId',
  authentication,
  threadController.deleteComment,
);
threadRoute.put(
  '/:threadId/comment/:commentId/update',
  upload.single('image'),
  authentication,
  threadController.updateComment,
);
threadRoute.get(
  '/:threadId/comment/:commentId/',
  authentication,
  threadController.showCommentsById,
);
export default threadRoute;
