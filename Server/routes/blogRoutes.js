import express from 'express';
import { createBlog,getBlogs } from "../controllers/blogController.js";
const router=express.Router();

router.post('/create',createBlog);
router.get('/getblog',getBlogs);

export default router;


//blogRoutes.js