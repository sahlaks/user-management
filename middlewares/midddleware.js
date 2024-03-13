const {check,validationResult} = require('express-validator');

const validationRules=[
    check('username').not().isEmpty().withMessage("Username is required").isLength({min:5}).withMessage('Username must be above 5 characters')
    .isAlpha().matches(/^[a-zA-Z0-9 ]+$/).withMessage("invalid value"),

    check('email').isEmail().withMessage('Invalid email'),
check('password').not().isEmpty().withMessage("password required").isLength({min:6}).withMessage("password must be minumum 6 characters").
custom(
    (value) => {
        // Check if the password contains at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          throw new Error('Password must contain at least one special character');
        }
        return true;
    }
)
]

const checkValidation =(req,res,next)=>{
    let error= validationResult(req)
    console.log(error.mapped())
    if(!error.isEmpty()){
        res.render("user/signup",{err:error.mapped()})
    }
    else{
        next()
    }
}

const newUserValidation =(req,res,next)=>{
    let error= validationResult(req)
    console.log(error.mapped())
    if(!error.isEmpty()){
        res.render("admin/adduser",{err:error.mapped()})
    }
    else{
        next()
    }
}

const adminValidation= [
    check('username').not().isEmpty().withMessage("Username is required").isLength({min:5}).withMessage('Username must be above 5 characters')
    .isAlpha().matches(/^[a-zA-Z0-9 ]+$/).withMessage("invalid value"),

    check('email').isEmail().withMessage('Invalid email')]

const checkAdminValidate =(req,res,next)=>{
    let error= validationResult(req)
    if(!error.isEmpty()){
        const userId=req.session.userId
        res.render("admin/useredit",{userId,err:error.mapped(),})
      
  
        
        // res.redirect(`/admin/useredit/${req.session.userId}`) 
    }
    else{
        next()
    }
}

const verifyLogin =(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.render("user/login")
    }
}


const verifyLoginAdmin =(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.render("admin/ad-login",{admin:true})
    }
}


module .exports ={validationRules,
                checkValidation,
                verifyLogin,
                verifyLoginAdmin,
                adminValidation,
                checkAdminValidate,
                newUserValidation}