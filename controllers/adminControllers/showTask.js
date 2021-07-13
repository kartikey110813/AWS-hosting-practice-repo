const mySql = require("mysql");
const multipleChoiceMath = require("../../models/adminModels/multipleChoiceMath");
const goalSequence = require("../../models/adminModels/goalSequence");
const multipleChoiceEnglish = require("../../models/adminModels/multipleChoiceEnglish");
const db = mySql.createConnection({
  host: "lms.co8hcriaiaco.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "champoo7",
    database: "lms",
    port:3306,
    dialect: "mysql"

});

exports.showMyData = (req, res) => {
  db.query("SELECT * FROM multiplechoicemath", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.render("adminViews/taskall", {
        show: result,
      });
    }
  });
};

exports.showMyData2 = async (req, res) => {
  const subject = req.body.subjectName;
  const grade = req.body.grade;
  console.log(grade, subject);
  // res.render("taskall")
  if (subject == "Maths") {
    db.query("SELECT * FROM multiplechoicemath WHERE gradeId = ? ",[grade], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.render("adminViews/taskall", {
          show: result,
          diableType: "disabled"
        });
      }
    });
  } else if (subject == "English") {
    db.query("SELECT * FROM multiplechoiceenglish WHERE gradeId = ? ",[grade], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.render("adminViews/taskall", {
          show: result,
          diableType: "disabled"

        });
      }
    });
  } else if (subject == "All") {
    // const result1 = await multipleChoiceMath.findAll();
    // const result2 = await multipleChoiceEnglish.findAll();
    // const result = await result1.concat(result2);
    // console.log(result);
    // res.render("adminViews/taskall", {
    //   show: result,
    // });
    db.query("SELECT * FROM multiplechoicemath WHERE gradeId = ? UNION SELECT * FROM multiplechoiceenglish WHERE gradeId = ? ",[grade,grade], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.render("adminViews/taskall", {
          show: result,
        });
      }
     
    });

   


  }
};

exports.addTaskSequence = (req, res) => {
  const {gradeId, taskID,subject, taskName, goalName, sequence, hour,quesArray } = req.body;
  console.log(req.body);
 
  for(let i = 0; i < taskID.length; i++) {
  db.query(
    "INSERT INTO goalSequence SET ?",
    {
      taskID: taskID[i],
      subject:subject[i],
      taskName: taskName[i],
      goalName: goalName[i],
      sequence: sequence[i],
      hour: hour[i],
      gradeId:gradeId[i],
      quesArray:quesArray[i]
    },
    (error, result) => {
      if (error) {
        console.log(error);
      }
       else {
        console.log(result)
        
      }
    }
  );

}
res.redirect("/taskSquence");
 
};

exports.showTaskSequence = (req,res) => {
  db.query("SELECT * FROM goalSequence", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.render("adminViews/taskSequenceadded", {
        data: result,
      });
    }
  });
}
