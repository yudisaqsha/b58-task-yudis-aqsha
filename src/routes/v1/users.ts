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
userRoute.post('/search', authentication, userController.searchUser);
userRoute.get('/following/:id', authentication, userController.getFollowing);
userRoute.get('/followers/:id', authentication, userController.getFollowers);
userRoute.get('/:id/checkfollow', authentication, userController.checkFollow);
export default userRoute;
