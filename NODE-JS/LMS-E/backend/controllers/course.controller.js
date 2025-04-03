import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
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
const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return next(
                new AppError('All fields are required', 500)
            )
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'Dummy',
                secure_url: 'Dummy'
            }
        })


        if (!course) {
            return next(
                new AppError('Course could not created, please try again', 500)
            )
        }


        if (req.file) {
             const result = await cloudinary.uploader.upload(req.file.path, {
                            folder: 'lms',
                        });
            if (result) {
                course.thumbnail._id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'course created successfully',
            course
        })
    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}
const updateCourse =async (req, res, next) => {
try {
    const id = req.params.id;
    console.log("course id:", id)
    const course =await Course.findByIdAndUpdate(
        id,
        {
            $set:req.body

        },
        {
            new :true,
            runValidators:true
        }
    );

    if(!course){
        return next(
            new AppError('Course with given id does not exist',500)
        )
    }
res.status(200).json({
    success:true,
    message: 'Course updated successfully',
    course,
})
} catch (error) {
    return next(
        new AppError(error.message, 500)
    )
}
}
const removeCourse = (req, res, next) => {
try {
    
} catch (error) {
    return next(
        new AppError(error.message, 500)
    )
}
}
export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    removeCourse,
    updateCourse
}