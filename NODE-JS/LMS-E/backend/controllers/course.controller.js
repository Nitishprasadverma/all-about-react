import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";

const getAllCourses = async (req, res, next) => {

    try {
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: 'These are all courses that you have',
            courses
        })

    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }

}

const getLecturesByCourseId = async (req, res, next) => {

    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) {
            return next(
                new AppError('Invalid id or course not fetched ', 404)
            )
        }
        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures
        })
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }

}

export {
    getAllCourses,
    getLecturesByCourseId
}