const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth')
const parentController = require('../controllers/parentauth')
const studentController = require('../controllers/studentauth')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const mySql = require('mysql');

const db = mySql.createConnection({
  host: process.env.DATABSE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port:process.env.PORT
})



// router.get("/", (req, res) => {res.render("index")})
router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
});
router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    if(req.user) {
      res.render('profile', {
        user: req.user
      });
    } else {
      res.redirect("/teacherlogin");
    }
    
  });

  router.get('/', parentController.parentisLoggedIn, (req, res) => {
    console.log("inside parents");
    console.log(req.user);
    res.render('index', {
      user: req.user
    });
  });
  router.get('/parentprofile', parentController.parentisLoggedIn, (req, res) => {
      console.log("inside parents");
      console.log(req.user);
      if(req.user) {
        res.render('parentprofile', {
          user: req.user
        });
      } else {
        res.redirect("/parentlogin");
      }
      
    });

    router.get('/parentprofile/managegoals', parentController.parentisLoggedIn, (req, res) => {
      console.log("inside parents -> inside manage goals");
      console.log(req.user);
      if(req.user) {
        res.render('manageStudent', {
          user: req.user
        });
      } else {
        res.redirect("/parentlogin");
      }
      
    });

    router.get('/', studentController.studentisLoggedIn, (req, res) => {
      console.log("inside students");
      console.log(req.user);
      res.render('index', {
        user: req.user
      });
    });



    // router.get('/studentprofile', studentController.studentisLoggedIn, (req, res) => {
    //     console.log("inside students");
    //     console.log(req.user);
    //     if(req.user) {
    //       res.render('studentprofile', {
    //         user: req.user
    //       });
    //     } else {
    //       res.redirect("/studentlogin");
    //     }
        
    //   });

router.get('/studentprofile', async(req,res) => {
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
      console.log(typeof(result[0].quesArray))
     res.render('studentprofile',{
       test:result
     })
    }
  })
}
})

router.post('/studentprofile',async (req,res) => {
  console.log("above cookies")
  console.log(req.cookies)
  if(req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_secret
    );
  
    const idstudent = req.body.idstudent;
    const taskID = req.body.taskID;
    const ques = req.body.ques;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;
    const option5 = req.body.option5;
    const ans = req.body.ans;
    const correctAns= req.body.correctAns;
  
    db.query('INSERT INTO progresstrackertaskdetails SET ?',{idstudent:idstudent,taskId:taskID,taskStatusJson:`[{"ques":"${ques}","option1":"${option1}","option2":"${option2}","option3":"${option3}","option4":"${option4}","option5":"${option5}","Student_answer":"${ans}","CorrectAns":"${correctAns}"}]`},(error,result) => {
        if(error) {
          console.log(error)
        }
        else {
            // res.redirect('/studentprofile/datasubmitted')
            res.render('datasubmitted',{
              message:"Test has been submitted"
            })

        }
    })
    
  }
})

router.get('/studentprofile/datasubmitted',(req,res) => {
  res.render('datasubmitted')
})




router.post('/parentprofile',studentController.studentregister)



router.get('/parentprofile/managestudentgoals/Goaladded', (req, res) =>{
  res.render('Goaladded')
})




 
router.get('/register',(req,res) => {
    res.render('registerpage')
})
router.get('/teacherlogin',(req,res) => {
    res.render('teacherlogin')
})
router.get('/parentlogin',(req,res) => {
    res.render('parentlogin')
})
router.get('/studentlogin',(req,res) => {
  res.render('studentlogin')
})

router.get('/parentregister',(req,res) => {
    res.render('parentregister')
})
router.get('/teacherregister',(req,res) => {
    res.render('teacherregister')
})





module.exports = router;