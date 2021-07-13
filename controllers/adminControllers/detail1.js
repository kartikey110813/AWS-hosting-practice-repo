const mySql = require("mysql");
const multipleChoiceMath = require("../../models/adminModels/multipleChoiceMath");
const multipleChoiceEnglish = require("../../models/adminModels/multipleChoiceEnglish");
const goal = require("../../models/adminModels/goal");

const db = mySql.createConnection({
   host: "lms.co8hcriaiaco.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "champoo7",
    database: "lms",
    port:3306,
    dialect: "mysql"

});


exports.dummy = async (req, res, next) => {
  
}

exports.detail = async (req, res, next) => {
  const grade = req.body.grade;
  const goalName = req.body.goalName;
  const subject = req.body.subject;
  const taskNameMath = req.body.taskNameMath;
  const taskNameEng = req.body.taskNameEng;
  const taskInst = req.body.taskInst;
  const quesType = req.body.quesType;
  const set = req.body.set;
  const quesArray = req.body.myArray;
 
  
  const response  =  await goal.findAll();
  const result = response[0].goalId
  console.log(result);
 
  if (subject == "Math") {
    db.query(
      "INSERT INTO multipleChoiceMath SET ?",
      {
        gradeID: grade,
        goalID : result,
        goalName: goalName,
        subject: subject,
        taskName: taskNameMath,
        taskInst: taskInst,
        quesType: quesType,
        set: set,
        quesArray: quesArray,
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/done");
        }
      }
    );
  } else if (subject === "English") 
  
  {
    db.query(
      "INSERT INTO multipleChoiceEnglish SET ?",
      {
        gradeID: grade,
        goalID : result,
        goalName: goalName,
        subject: subject,
        taskName: taskNameEng,
        taskInst: taskInst,
        quesType: quesType,
        set: set,
        quesArray: quesArray,
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/done");
        }
      }
    );
  }
  
};
