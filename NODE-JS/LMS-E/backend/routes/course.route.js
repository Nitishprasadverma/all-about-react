import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { authorizedRoles, authorizeSubsciber, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js'

const router = Router();
router.route('/')
    .get(getAllCourses)
    .post(
        upload.single('thumbnail'),
        isLoggedIn,
        authorizedRoles('ADMIN'),
        createCourse
    )

router.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(isLoggedIn,
        authorizeSubsciber,
        authorizedRoles('ADMIN'),
        updateCourse)
    .delete(isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse)

    .post(
        isLoggedIn,
        upload.single('lecture'),
        authorizedRoles('ADMIN'),
        addLectureToCourseById
    )

export default router