import express from 'express';
import * as userController from '../controller/userController'
import { authentication } from '../middleware/authmiddleware';
import { uploadMultiple } from '../middleware/uploadfile';
const userRoute = express.Router();

userRoute.get('/', authentication,userController.getAllUsers);
userRoute.get('/current-user', authentication,userController.getCurrentUser);
userRoute.get('/suggested',authentication,userController.getSuggestedUsers)
userRoute.put('/update', authentication,uploadMultiple,userController.updateUser);
userRoute.delete('/delete/:id', authentication, userController.deleteUser);
userRoute.post('/toggle-follow', authentication, userController.toggleFollow);
userRoute.get('/:username', authentication, userController.getUserByUsername);
export default userRoute;