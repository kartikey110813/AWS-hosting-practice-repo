const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentauth')

router.post('/showstudent',studentController.showStudent);
router.get('/showstudent',studentController.showStudent);

// router.post('/managegoals',studentController.manageStudentGoals);
// router.get('/managegoals',studentController.manageStudentGoals);

router.get('/managegoals',studentController.showManageGoals);
router.post('/managegoals',studentController.managingGoals);





module.exports = router;
