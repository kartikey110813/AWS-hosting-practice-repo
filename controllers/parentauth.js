const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const mySql = require('mysql');
const db = mySql.createConnection({
    host: "lms.co8hcriaiaco.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "champoo7",
    database: "lms",
    port:3306,
    dialect: "mysql"
})
exports.parentlogin = async (req,res) => {
    try {
      const { parentemail , parentpassword } = req.body;
      if(!parentemail || !parentpassword) {
          return res.status(400).render('parentlogin',{
              message: 'please provide email and password'
          })
      }

     

    db.query('SELECT * FROM parents WHERE parentemail = ?',[parentemail], async (error,result) => {
      if(error) {
          console.log(error)
      }
      console.log(result);

      if(!result || !(await bcrypt.compare(parentpassword,result[0].parentpassword) )) {
          res.status(401).render('parentlogin',{
              message: 'The email or the password is incorrect',
          })
      }
      else {
          const id = result[0].idparents;
          // console.log(result.id)
          console.log(id)
          const token = jwt.sign({
              id: id
          },process.env.JWT_secret,{
              expiresIn: process.env.JWT_EXPIRESIN
          })
          console.log("the token is" + token)
          const cookieoption = {
              expires : new Date(
              Date.now() + process.env.JWT_COOKIEEXPIRES * 24 * 3600 * 1000),
              httpOnly : true
          }
          res.cookie('jwt',token,cookieoption);
          // console.log("ram ram")
          res.status(200).redirect("/parentprofile")
      }
    })
  }
    catch(error) {
        console.log("neeche error hai");
        console.log(error)
    }
    db.query('SELECT * FROM parents', (error,result) => {
      if (result) {
        res.render('parentlogin',{
          result:result
        })
      }

    })
    
  }
  
exports.parentregister = (req,res) => {
    const {parentemail,parentpassword,parentconfirmPassword,parentFirstName,parentLastName,Address1,Address2,State,Country,Zipcode} = req.body;
    db.query('Select parentemail from parents WHERE parentemail = ?', [parentemail], async (error,result) => {
        if(error) {
            console.log(error)
        }
        if(result.length > 0) {
            return res.render('parentregister',{
                message: 'the email has been taken'
            })
        }
        else if(parentpassword.length < 8){
          return res.render('parentregister',{
            message:"Password must be 8 characters long"
          })
      }
        else if(parentpassword != parentconfirmPassword) {
            return res.render('parentregister',{
                message: 'password do not match'
            })
        }
        
        let hashedPassword = await bcrypt.hash(parentpassword,8)
        console.log(hashedPassword)
        db.query('INSERT INTO parents SET ?',{parentemail: parentemail ,parentpassword : hashedPassword,parentFirstName:parentFirstName,parentLastName:parentLastName,Address1:Address1,Address2:Address2,State:State,Country:Country,Zipcode:Zipcode},(error,results) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log(results)
                return res.render('parentregister',{
                    message: 'Parent is Registered Successfully!'
                })
            }
        })
    })
    
}



exports.parentisLoggedIn = async (req, res, next) => {
  
  

  
  
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_secret
        );
  
        console.log("decoded parents");
    
        console.log(decoded);
        
        // 2) Check if user still exists
        db.query('SELECT * FROM parents WHERE idparents = ?', [decoded.id], (error, result) => {
          
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          // console.log(result)
          req.user = result[0];
          console.log(req.user)
          // res.locals.user = result[0];
          console.log("next parents")
          // console.log(req)
          return next();
        });
        
      } catch (err) {
        return next();
      }
     
      
    } else {
      next();
    }
 
    
 
  };
  

exports.parentlogout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };
