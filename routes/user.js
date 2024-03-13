const express = require("express");
const {loginController, signupGetController, signupPostController, homeController, signoutController} = require("../controllers/user-controllers");
const { validationRules, checkValidation, verifyLogin } = require("../middlewares/midddleware");
const app = express.Router();

app.get('/login',(req,res)=>{
        if(req.session.user){
                
                res.redirect('/home')
        }else{

                res.render("user/login") 
        }
})
app.post('/login',loginController)

app.get('/signup',signupGetController)
app.post('/signup',validationRules,checkValidation,signupPostController)
app.get('/home',verifyLogin,homeController)
app.get('/signout',verifyLogin,signoutController)

module.exports = app