import express from 'express'
import { createStudent,getStudents } from '../controllers/studentController.js'

const router =express.Router();

router.post("/create",createStudent);
router.get("/students",getStudents);
// router.put("/update/:id",updateStudent);
// router.delete("/delete/:id",deleteStudent);

export default router;