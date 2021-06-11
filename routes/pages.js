const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth')
const parentController = require('../controllers/parentauth')
const studentController = require('../controllers/studentauth')
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

router.get('/studentprofile',studentController.showTest)
router.post('/studentprofile',studentController.showTest)

router.get('/studentprofile/datasubmitted',(req,res) => {
  res.render('datasubmitted')
})




router.post('/parentprofile',studentController.studentregister)



router.get('/parentprofile/managegoals/goaladded', (req, res) =>{
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