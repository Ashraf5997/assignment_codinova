
  var dbConn = require('../../config/db.config');

  var usersModel = function(user){

     this.Id              =     user.Id;
     this.fullname        =     user.fullname;
     this.email           =     user.email;
     this.password        =     user.password;
     this.createdby       =     user.createdby;
     this.accesstype      =     user.accesstype;

  }

/*// get all users
  usersModel.getAllUsers = (result)=>{
     dbConn.query("SELECT * FROM users" , (err , res )=>{
     if(err)
     {
         console.log("error while fetching  all task");
         result(null , err);
     }
     else{
         console.log("all task fetched successfully");
         result(null , res);
         //  res.json({ success: 200,taskData:res})  ; 
         //  result.send(200).send({success : 200, data : res});
       }
     })
 }*/

 // create user
usersModel.createUser = (reqData , result) =>
{
  dbConn.query('INSERT INTO users SET?' , reqData , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

 // login user
 usersModel.loginUser = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM users WHERE email =?' , reqData.email , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }

 // get token data
 usersModel.extractToken = (reqData , result) =>
 {
   dbConn.query('SELECT * FROM users WHERE id =?' , reqData , (err , res)=>{
       if(err)
       {
            result( err, null)
       }else{
            result(null ,res) 
       }
   })
 }




module.exports= usersModel;