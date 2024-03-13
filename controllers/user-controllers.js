const User = require("../model/usermodel");
const bcrypt = require('bcrypt')

//..........login controller...............
const loginController = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err,result)=>{
        if(result){

          req.session.user = req.body.username

          res.redirect("/home")
        }else{
          res.status(401).json({ message: "Incorrect password." });
        }
      })
    
    } else {
      res.render('user/login')
      res.status(404).json({ message: "User not found." });
    }
    //res.render('user/login')
  } catch (error) {
    console.log(error);
    res.send("wrong details");
  }
};

//...........signup ontroller...................
const signupGetController = (req, res) => {
  if(req.session.user){

    res.redirect('/home')
  }else{

    res.render("user/signup");
  }
};

const signupPostController = async (req, res) => {
  try{

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;
    const value = await User.findOne({email:req.body.email})
    
    if(value){
      res.send({error:'Email already exist'})
    }else{
      const user = await User.create(req.body)
      req.session.user = req.body.username
      res.redirect("/home");
    }

  }catch (error){
    console.log(error)
    res.send({error:'An error occurred during signup'})
  }
};

//.............home controller............
const homeController = (req, res) => {
    res.render("user/home");
};

//.............signout controller...........
const signoutController = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
module.exports = {
  loginController,
  signupGetController,
  signupPostController,
  homeController,
  signoutController,
};
