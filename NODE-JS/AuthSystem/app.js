import express from 'express';
import cookieParser from 'cookie-parser';

import morgan from 'morgan';
import authRoutes from './Routes/auth.routes.js';


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//routes

app.use('/api/v1/auth', authRoutes)

app.use('/', (req, res) => {
    res.status(200).json({
        data: 'JWT Auth nitish'
    })
})

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success : false,
        message : err.message || "Something went wrong!"
    })
})

export default app;