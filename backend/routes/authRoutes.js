import { Router } from 'express';
import { login, logout } from '../controllers/authController.js';
import { loginValidation} from '../middlewares/authValidation.js';


const router = Router();

router.post('/login', loginValidation, login);
router.delete('/logout', logout);

export default router;

