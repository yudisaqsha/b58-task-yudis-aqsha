import express from 'express';
import * as userController from '../../controllers/userController';
import { authentication } from '../../middlewares/authmiddleware';
import { uploadMultiple } from '../../middlewares/uploadfile';
const userRoute = express.Router();

userRoute.get('/', authentication, userController.getAllUsers);
userRoute.get('/current-user', authentication, userController.getCurrentUser);
userRoute.get('/suggested', authentication, userController.getSuggestedUsers);
userRoute.put(
  '/update',
  authentication,
  uploadMultiple,
  userController.updateUser,
);
userRoute.delete('/delete/:id', authentication, userController.deleteUser);
userRoute.post('/toggle-follow', authentication, userController.toggleFollow);
userRoute.get('/:username', authentication, userController.getUserByUsername);
userRoute.get('/search', authentication, userController.searchUser);
userRoute.get('/following', authentication, userController.getFollowed);
export default userRoute;
