import { model, Schema } from 'mongoose'

const courseSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
        minLength:[8, 'Title must be atleast 8 characters'],
        maxLength:[60, 'Title should be less than 60 character'],
        trim:true,
    },
    description: {
        type: String,
        required:[true,'Title is required'],
        minLength:[8,'Description should be atleast 8 characters'],
        maxLength: [200, 'description should be less than 60 characters'],

    },
    category: {
        type: String,
        required : [true, 'Category is required'],

    },
    thumbnail: {
        public_id: {
            type: String,
            required:true
        },
        secure_url: {
            type: String,
            required:true
        }
    },
    lectures: [
        {
            titile: String,
            description: String,
            lecture: {
                public_id: {
                    type: String,
                    required:true
                },
                secure_url: {
                    type: String,
                    required:true
                }
            }
        }
    ],
    numbersOfLectures: {
        type: Number,
        default:0
    },
    createdBy: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})


const Course = model('Course', courseSchema);

export default Course;