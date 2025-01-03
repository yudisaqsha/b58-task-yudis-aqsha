import express from 'express';
import { login, register } from '../../controllers/authController';
// import { upload } from '../middleware/uploadfile';
const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);

export default authRoute;
