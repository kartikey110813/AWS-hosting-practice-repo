const express = require('express')
const authController = require('../controllers/auth')
const parentController = require('../controllers/parentauth')
const studentController = require('../controllers/studentauth')


const router = express.Router();
router.post('/teacherlogin',authController.login)
router.post('/parentlogin',parentController.parentlogin)
router.post('/studentlogin',studentController.studentlogin)

router.post('/teacherregister',authController.register)
router.post('/parentregister',parentController.parentregister)
router.get('/logout', authController.logout);
router.get('/parentlogout', parentController.parentlogout);
router.get('/studentlogout', studentController.studentlogout);



module.exports = router;