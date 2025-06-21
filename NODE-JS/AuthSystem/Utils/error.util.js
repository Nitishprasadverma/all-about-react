class AppError  extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode || 500;
        this.success = false;

        Error.captureStackTrace(this,this.construcutor);
    }
}

export default AppError;