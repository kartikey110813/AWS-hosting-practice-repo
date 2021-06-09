const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const mySql = require('mysql');
const students = require('../models/students')
const Parents = require('../models/parents');
const Parentselect = require('../models/parentselect')
const goalSequence = require('../models/adminModels/goalSequence')
const progresstrackerDetails = require('../models/adminModels/ProgresstrackerDetails')
const Sequelize = require('sequelize')
const sequelize = require('../util/database');


const db = mySql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port:process.env.PORT
})


exports.studentlogin = async (req,res) => {
    try {
      const { usernameStudent , passwordStudent } = req.body;
      if(!usernameStudent || !passwordStudent) {
          return res.status(400).render('studentlogin',{
              message: 'please provide email and password'

          })
      }
    
    db.query('SELECT * FROM students WHERE usernameStudent = ?',[usernameStudent], async (error,result) => {
      if(error) {
          console.log(error)
      }
      console.log(result)
      if(!result || !(await bcrypt.compare(passwordStudent,result[0].passwordStudent) )) {
          res.status(401).render('studentlogin',{
              message: 'The username or the password is incorrect'
          })
      }
      else {
          const id = result[0].idstudent;
          const token = jwt.sign({
              id: id
          },process.env.JWT_secret,{
              expiresIn: process.env.JWT_EXPIRESIN
          })
          const cookieoption = {
              expires : new Date(
              Date.now() + process.env.JWT_COOKIEEXPIRES * 24 * 3600 * 1000),  
              httpOnly : true
          }
          res.cookie('jwt',token,cookieoption);
          res.status(200).redirect("/studentprofile")
      }
    })
  }
    catch(error) {
        console.log(error)
    }
  }


exports.studentregister = (req,res) => {
    const {usernameStudent,passwordStudent,confirmPasswordStudent,idparents,studentFirstName,studentLastName} = req.body;
    
    
    db.query('Select usernameStudent from students WHERE usernameStudent = ?', [usernameStudent], async (error,result) => {
        if(error) {
            console.log(error)
        }
        if(result.length > 0) {
            return res.render('parentprofile',{
                message: 'the username has been taken'
            })
        }
        else if(passwordStudent != confirmPasswordStudent) {
            return res.render('parentprofile',{
                message: 'password do not match'
            })
        }
        let hashedPassword = await bcrypt.hash(passwordStudent,8)
        console.log(hashedPassword)
        db.query('INSERT INTO students SET ?',{usernameStudent : usernameStudent,passwordStudent : hashedPassword ,idparents: idparents,studentFirstName:studentFirstName,studentLastName:studentLastName},(error,results) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log(idparents)
                return res.render('parentprofile',{
                    message: 'student registerd'
                  
                })
                
            }
        })
    })
   
}

exports.showTest = async(req, res) => {
  console.log("above cookies")
console.log(req.cookies)
if(req.cookies.jwt) {
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_secret
  );

  console.log("decoded show student");
console.log(decoded.id);
  console.log(decoded);
  db.query('SELECT * from goalsequence,parentselect WHERE goalsequence.gradeId = parentselect.selectGrade AND parentselect.idstudent = ?',[decoded.id],(error, result) => {
    if (error){
     console.log(error);
    }
    else{
     res.render('studentprofile',{
       test:result
     })
    }
  })
}
}



exports.managingGoals = async (req, res) => {
  const idstudent = req.body.idstudent;
  const usernameStudent = req.body.usernameStudent;
if(req.cookies.jwt) {
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_secret
  );
  db.query('SELECT * FROM parentselect WHERE parentselect.idparents = ?',[decoded.id],(error,result) => {
          if (error) {  
      console.log(error); 
    }
    else{
     res.render('manageStudent',{
        user:result,
        usernameStudent : usernameStudent,
        idstudent: idstudent
      });
    
    }
  })
  let {idstudent,myName,selectGrade,selectGoal,selectHour,myDate} = req.body;
  db.query('INSERT INTO parentselect SET ?', {idstudent:idstudent,idparents:decoded.id,myName:myName,selectGrade:selectGrade,selectGoal:selectGoal,selectHour:selectHour,myDate:myDate},(error, result) => {
    if (error) {
      console.log(error);
    }
    else{
      goalSequence.findAll({
        where: {
          gradeID : selectGrade,
          goalName : selectGoal
        }
      }).then(result => {console.log(result);})
      .then(
        (result = []) => {
        for(let i = 0; i< result.length; i++) {
          return  progresstrackerDetails.create({
              idstudent : idstudent,
              goalId : selectGoal,
              taskID : result[i].taskID,
              hour : result[i].hour,
              taskName : result[i].taskName,
              taskValue : "assigned",
              taskDueDate : myDate,
              taskStatus : 'assigned'
            })
        };
        }
      )
      .catch(err => console.error(err))
      .then((result) => {console.log(result);})
      .catch(err => {console.error(err);})
    }

      //  res.redirect('Goaladded')
  })

// db.query('INSERT INTO parentselect SET ?', {},(error, result) => {
//   if (error) {
//     console.log(error);
//   }
//   else{
//     console.log(myName);
    
//    res.redirect('/parentprofile/managegoals/goaladded')

//   }
// })


 
    
  

}
}

exports.showManageGoals = async (req, res) => {
  console.log("above cookies")
  console.log(req.cookies)
  if(req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_secret
    );
  
    console.log("decoded show student");
  console.log(decoded.id);
    console.log(decoded);

        
    db.query('SELECT * FROM parentselect WHERE parentselect.idparents = ?',[decoded.id],(error,result) => {
      console.log("neeche dekh");
      console.log(result);
      
      if (error) {
        console.log(error); 
      }
      else{
       res.render('manageStudent',{
          user:result
        })
      }
    })    


    }  
}

exports.showStudent = async (req,res) => {
  console.log("above cookies")
  console.log(req.cookies)
  if(req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_secret
    );

    console.log("decoded show student");

    console.log(decoded);
    db.query('Select * from students where students.idParents = ?',[decoded.id], async (error,result) => {
      if(error) {
        console.log(error);
    }
    else {
    
      console.log("hello")
         let a = result.map((b) => {return {idstudent : b.idstudent, usernameStudent : b.usernameStudent}});
          console.log(a);
        return res.render('showstudent',{
          users: a
        })
        // console.log(users)
        
      }
    })
  }

} 

exports.studentisLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_secret
        );
  
        console.log("decoded students");
        console.log(decoded);
  
        // 2) Check if user still exists
        db.query('SELECT * FROM students WHERE idstudent = ?', [decoded.id], (error, result) => {
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          // console.log(result)
          req.user = result[0];
          console.log(req.user)
          // res.locals.user = result[0];
          console.log("next student")
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
 


exports.studentlogout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };
