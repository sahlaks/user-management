const admin = require("../model/adminmodel");
const User = require("../model/usermodel")
const bcrypt = require('bcrypt')

//............admin post login access......... 
const adminLogin = async (req, res) => {

    try{
    const user = await admin.findOne({ username: req.body.username });
    console.log(req.body);
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(result){
                if (user.isAdmin) {
                    req.session.user = req.body.username
                    
                    res.redirect('/admin');
                }
            }else{
                res.render('admin/ad-login',{alert :'Incorrect password.'} );
            }
        })
        }
        else{
        res.render('admin/ad-login',{alert :'Invalid credentials'});
        }

    } catch(error){
    console.log(error)
    }
}

//...................admin home page access..............
const getHomePage = async (req,res) => {
    res.render('admin/ad-home',{admin:true})
}

//...................admin dashboard access..............
const adminDashboard = async (req,res)=>{
    
    try{
        const users = await User.find().lean();
           // res.json(users)
           
            res.render('admin/dashboard',{ users, admin:true});
        } catch (error) {
            console.error(error);
        
        } 
}

//...................get route User update.................
const userEditbyAdmin = async (req,res)=>{
    const userId = req.params.userId;
    req.session.userId=req.params.userId;
    
      const data = await User.findOne({_id:userId}).lean();
    try{
        res.render('admin/useredit',{userId, admin:true})
    } catch (error){
            console.log(error)
    }
}


//...............post route of User update...............

const userEditedbyAdmin = async (req,res)=>{
    console.log("called")
    const userId = req.params.userId;
    try{
       
        const val = await User.updateOne({_id: userId},{$set:{username:req.body.username,email:req.body.email}}) 
        if(val){
            res.redirect('/admin/dashboard')
        }
    } catch (error){
            console.log(error)
    }
}


//...........delete an User...................
const deleteUser = async (req,res) =>{
    const userId = req.params.userId;
    try{
        const deleteUser = await User.deleteOne({_id: userId})
        if(deleteUser){
            console.log('deleted an user')
            const users = await User.find().lean();
            res.redirect('/admin/dashboard')
        }else{
            console.log('user not found')
        }

    }catch (error){
        console.log(error)
    }
}

//............search an User..................
const searchUser = async (req,res)=>{
    const search = req.body.username;
    try{
        console.log(search);
        const users = await User.find({username: req.body.username}).lean();
        if(users){
            res.render('admin/dashboard',{ users, admin:true});
        }
        else{
            res.render('admin/dashboard',{error:'No results'})
        }

    }catch(error){
        console.log(error)
    }
}

//......................add user get...................
const addUser = (req,res)=>{
    res.render('admin/adduser',{admin:true})
}

//..............add user post...................
const newUser = async(req,res)=>{
    try{
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashPassword;
        const value = await User.findOne({email:req.body.email})
        if(value){
          res.send({alert:'Email already exist'})
        }else{
          const user = await User.create(req.body)
          res.redirect('/admin/dashboard')
        }
    }catch(error){
        console.log(error)
    }
}

//..............admin logout..............
const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/admin')
}



module.exports = {adminLogin,adminDashboard,userEditbyAdmin,getHomePage,logoutController,userEditedbyAdmin,deleteUser,searchUser,addUser,newUser}