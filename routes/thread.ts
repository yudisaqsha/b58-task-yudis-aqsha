import express, { Request, Response } from "express";
import * as threadController from '../controller/threadController';
import {authentication} from '../middleware/authmiddleware';
import  upload  from "../middleware/uploadfile";
const threadRoute = express.Router();

threadRoute.get('/',authentication,threadController.showThreads)
threadRoute.get('/profile/:username',authentication,threadController.showThreadsbyUsername)
threadRoute.get('/:id',authentication,threadController.showThreadsbyId)
threadRoute.post('/create', authentication,upload.single('image'),threadController.createThread);
threadRoute.put('/:id/edit',authentication,upload.single('image'),threadController.updateThread)
threadRoute.delete('/delete/:id',authentication,threadController.deleteThread)
threadRoute.post('/:id/like', authentication, threadController.likeThread);
threadRoute.get('/:id/comment', authentication, threadController.showComments);
threadRoute.post('/:id/addcomment', authentication,upload.single('image'), threadController.addComment);
threadRoute.delete('/:threadId/comment/:commentId', authentication, threadController.deleteComment);
export default threadRoute