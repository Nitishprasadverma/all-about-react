const express = require("express");

const {home,creatUser,getUsers,deleteUser,editUser} = require("../controllers/userController.js");


const router = express.Router();
router.get("/",home)
router.post('/createUser',creatUser)
router.get('/getusers',getUsers)
router.delete('/deleteuser/:id',deleteUser)
router.put('/edituser/:id',editUser)
module.exports = router;