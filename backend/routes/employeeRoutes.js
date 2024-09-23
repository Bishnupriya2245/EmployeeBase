import { Router } from 'express';
import { createEmployee, updateEmployee, deleteEmployee, getEmployee, getEmployeeById, searchEmployee } from '../controllers/employeeController.js';
import { ensureAuthenticated } from '../middlewares/auth.js';
import { employeeValidation } from '../middlewares/employeeValidation.js';
import {cloudinaryFileUploader} from '../middlewares/FileUpload.js'; 

const router = Router();

router.use(ensureAuthenticated); // Protect all routes with authentication
router.post('/employees', cloudinaryFileUploader.single('f_Image'), employeeValidation, createEmployee);
router.put('/employees/:id', cloudinaryFileUploader.single('f_Image'), employeeValidation, updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.get('/employees', getEmployee);
router.get('/employees/:id', getEmployeeById);
router.get('/employees/search', searchEmployee);

export default router;
