const { validationResult } = require("express-validator");
const { adminDashboard, adminLogin, userEditbyAdmin, logoutController, getHomePage, deleteUser, userEditedbyAdmin, searchUser, addUser, newUser } = require("../controllers/admin-controller");
const { verifyLoginAdmin, adminValidation, checkAdminValidate, validationRules, newUserValidation } = require("../middlewares/midddleware");
const User = require("../model/usermodel");
const express = require("express");
const app = express.Router();

//GET route of admin login
app.get('/adlogin', (req, res) => {
    res.render('admin/ad-login', { admin: true });
});

// POST route for processing the form submission
app.post('/adlogin', adminLogin);

//GET route of admin home
app.get('/',verifyLoginAdmin,getHomePage);

//GET route of admin dashboard
app.get('/dashboard',verifyLoginAdmin,adminDashboard);

//GET route of edit user
app.get('/useredit/:userId',verifyLoginAdmin,userEditbyAdmin);

//POST route of edit user
app.post('/useredit/:userId',verifyLoginAdmin,
adminValidation,checkAdminValidate,
userEditedbyAdmin);

//GET route of delete user
app.get('/delete/:userId',verifyLoginAdmin,deleteUser)

//Search an user
app.post('/search',searchUser)

//add user
app.get("/adduser",verifyLoginAdmin,addUser)

app.post("/adduser",verifyLoginAdmin,validationRules,newUserValidation,newUser)

//logout route of admin
app.get("/logout", verifyLoginAdmin,logoutController);

module.exports = app 