const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const mySql = require('mysql');
const db = mySql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABSE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT,
    dialect: process.env.DIALECT
   
})

exports.login = async (req,res) => {
  try {
    const { email , password } = req.body;
    if(!email || !password) {
        return res.status(400).render('teacherlogin',{
            message: 'please provide email and password'
        })
    }
  
  db.query('SELECT * FROM users WHERE email = ?',[email], async (error,result) => {
    if(error) {
        console.log(error)
    }
    console.log(result)
    if(!result || !(await bcrypt.compare(password,result[0].password) )) {
        res.status(401).render('teacherlogin',{
            message: 'The email or the password is incorrect'
        })
    }
    else {
        const id = result[0].idusers;
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
        res.status(200).redirect("/profile")
    }
  })
}
  catch(error) {
      console.log(error)
  }
}

exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;
  
    // 2) Check if user exists && password is correct
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if(error) {
        console.log(error)
      }
  
      if(results.length > 0 ) {
        return res.render('teacherregister', {
                  message: 'That Email has been taken'
                });
      } else if(password !== confirmPassword) {
        return res.render('teacherregister', {
          message: 'Passwords do not match'
        });
      }
        
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
  
      db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, result) => {
        if(error) {
          console.log(error)
        } else {
          db.query('SELECT idusers FROM users WHERE email = ?', [email], (error, result) => {
            const idusers = result[0].idusers;
            console.log(idusers);
            const token = jwt.sign({ idusers }, process.env.JWT_secret, {
              expiresIn: process.env.JWT_EXPIRESIN
            });
  
            const cookieOptions = {
              expires: new Date(
                Date.now() + process.env.JWT_COOKIEEXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true
            };
            res.cookie('jwt', token, cookieOptions);
  
            res.status(201).redirect("/");
          });
        }
      });
    });
  };
  
  // Only for rendered pages, no errors!
  exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_secret
        );
  
        console.log("decoded");
        console.log(decoded);
  
        // 2) Check if user still exists
        db.query('SELECT * FROM users WHERE idusers = ?', [decoded.id], (error, result) => {
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          // console.log(result)
          req.user = result[0];
          console.log(req.user)
          // res.locals.user = result[0];
          console.log("next")
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
  
  exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };
