const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mySql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const cookieParser = require("cookie-parser");
const parents = require("./models/parents");
const students = require("./models/students");
const teachers = require("./models/teachers");


const parentselect = require("./models/parentselect");
const multipleChoiceEnglish = require("./models/adminModels/multipleChoiceEnglish");
const multipleChoiceMath = require("./models/adminModels/multipleChoiceMath");
const ProgresstrackerDetails = require('./models/adminModels/ProgresstrackerDetails')
const Progresstrackersummary = require('./models/adminModels/progresstrackersummary');
const ProgresstrackerTaskDetails = require('./models/adminModels/ProgresstrackerTaskDetails')
const goalSequence = require("./models/adminModels/goalSequence");
const sequelize = require("./util/database");

dotenv.config({
  path: "./.env",
});

app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

try {
  sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/parentprofile", require("./routes/parentprofile"));

app.use('/',require('./routes/adminRoutes/detail1'))

sequelize
  .sync()
  .then((result) => {
    // console.log(req.body)
    app.listen(3000 || process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

  
