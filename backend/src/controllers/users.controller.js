
const joi         = require('joi')
const usersModel  = require('../models/users.model');
const tokonModel  = require('../models/refreshToken.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =    require('bcrypt');
const chalk   =    require('chalk');
const log     =    console.log;
const{ json } = require('body-parser');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// CREATE USER
exports.createUser = async(req ,ress , next )=>{

         const userSchema = joi.object({
            fullname   : joi.string().min(3).max(55).required(),
            email      : joi.string().email().required(),
            password   : joi.string().pattern(new RegExp('^[a-zA-z0-9]{6,30}$')).required(), 
            accesstype : joi.string(),
            createdby  : joi.string(),
         })
           // validating data
            const {error} = userSchema.validate(req.body);
            if(error){
              return next(error)
            }

           const {fullname , email , accesstype, createdby ,password } = req.body;
           // Hashing password
           const hashedPassword = await bcrypt.hash(password,10)
           // creating object 
           const userObj ={
               fullname,
               email,
               accesstype,
               createdby,
               password : hashedPassword
           }
            // calling usersModel 
            //Authentication
        auth (req , ress).then(res=>{
        if(res !=" " && res != null){

          // console.log(JSON.stringify(res)+"adsdadadasddadad")
          if(res.accesstype == "admin-user"){
            usersModel.createUser(userObj , (err , data)=>{
                if(err){
                    
                    log(chalk.yellow(" Email Already Exist", JSON.stringify(err)));
                    ress.json({status:409 ,message:'Email already exist' })

                    }else{

                    log(chalk.blue(" New User Is Created Successfully ",JSON.stringify(data)));
                     // Jwt  token creating
                    access_token= JwtService.sign({id:data.insertId , accesstype : userObj.accesstype, fullname:userObj.fullname})
                    ress.json({status:201 ,message:'New user created successfully' ,newUserId:data.insertId , access_token})    
                }  
            })
        }else{
            log(chalk.yellow(" NOT AUTHORISED TO CREATE PRODUCT "));
            ress.json({status:401 ,message:' NOT AUTHORISED '})   ; 
        }
     }
  })
}

 
// LOGIN USER
exports.loginUser = async(req ,res , next )=>{

    const userSchema = joi.object({
       email   : joi.string().email().required(),
       password: joi.string().pattern(new RegExp('^[a-zA-z0-9]{6,30}$')).required(), 
    })
   
      // validating data
       const {error} = userSchema.validate(req.body);
       if(error){
       return next(error)
       }

      const {email,password } = req.body;
      // Hashing password
      // creating object 
      const userObj ={
          email,
          password
      }
       
      // calling usersModel 
       usersModel.loginUser(userObj , (err , data)=>{
           if(err){

              log(chalk.yellow(" Internal Server error ",JSON.stringify(err)));
              res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 

           }else if(data ==""){

              log(chalk.yellow(" Email Not Found ",JSON.stringify(data)));
              res.json({status:404 ,message:'Email not found' ,Data:data})   
           }
           else{

             bcryptedPassword = data[0].password;
             bcrypt.compare(userObj.password , bcryptedPassword ,(err , result )=>{
                   
                if(result){
                 // Jwt  token creating
                   access_token= JwtService.sign({id:data[0].id , accesstype : data[0].accesstype, fullname:data[0].fullname})
                   res.json({status:200 ,message:'Access Verified' ,userData:data , access_token})    

                    }else{
                        res.json({status:403 ,message:'Access Denied Invalid Credentials'})    
                    }
              })
           }
       })
}



// LOGOUT USER
exports.logoutUser = async(req ,res , next )=>{
   log(req.body.refresh_token)

         try{

       //  auth(req , ress).then(res=>{

              tokonModel.deleterefreshTokon(req.body.refresh_token , (err , data)=>{
                if(err){
                   res.json({status:500,message:'Interrnal Server Error'})    
                }else if(data){
                    res.json({status:200,message:'SUCCESSFULLY LOGGED-OUT'})      
                }
          })

      }catch(err){
        res.json({status:403 ,message:'Access Denied Token Required'})    
      }
}
    





