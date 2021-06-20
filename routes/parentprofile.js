const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentauth')

router.post('/showstudent',studentController.showStudent);
router.get('/showstudent',studentController.showStudent);

// router.post('/managegoals',studentController.manageStudentGoals);
// router.get('/managegoals',studentController.manageStudentGoals);


router.post('/managestudentgoals/managegoals',studentController.managingGoals);
router.get('/managestudentgoals',studentController.showToManage);

// router.get('/managestudentgoals',studentController.showStudent)





module.exports = router;
