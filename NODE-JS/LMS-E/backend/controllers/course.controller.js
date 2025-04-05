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
            new AppError(e.message, 500)
        )
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("course id:", id)
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body

            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 500)
            )
        }
        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course,
        })
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }
}

const removeCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 500)
            )
        }

        await Course.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        })

    } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
    }
}

const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;

        if (!title || !description) {
            return next(
                new AppError('All fields are required', 400)
            )
        }
        const course = await Course.findById(id);
        if (!course) {
            return next(
                new AppError('Course with given id does not exist', 400)
            )
        }

        const lectureData = {
            title,
            description,
            lecture:{ }
    }
    
        if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lms',
                resource_type: "video" 
            });
            if (result) {
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return next(
                new AppError(error.message, 500)
            )
        }

    }
    console.log('Lecture> ', JSON.stringify(lectureData))
    course.lectures.push(lectureData);

    course.numbersOfLectures = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        message: 'Lecture successfully added to the course!',
        course

    })
} catch (error) {
    return next(
        new AppError(error.message, 404)
    )
}
   
}
export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    removeCourse,
    updateCourse,
    addLectureToCourseById
}