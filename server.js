const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectToDatabase = require('./models/index');
const path = require('path')
const colors = require('colors')
const router = require("./routes/routes")
//const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')
const mongoSaitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
//const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
//const sendmail = require('./routes/sendmail')
const errorHadler = require('./middleware/error');

// Load env vars
dotenv.config({path:'./config/config.env'})

const PORT = process.env.PORT || 3003

const app = express()

app.use(express.json())

app.use(
    session({
        secret:'my secret key',
        saveUninitialized: true,
        resave: true
    }))

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})    

//app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.use( express.static( "views" ) );
//app.set('views','routes')



app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//Sanitize Data
app.use(mongoSaitize())

//Set security
app.use(helmet())

//Prevent XSS attacks
app.use(xss())

//Rate Limiting
/* const limiter = rateLimit({
    windowMs: 10 * 60 * 1000000,  // 10 mins
    max: 100 
}) 
app.use(limiter) */

//Prevent http param pollution
app.use(hpp())
app.use(errorHadler)  

app.use('/', router)  

//CONNECTINT TO DATA BASE
 connectToDatabase( {
             useNewUrlParser: true, useUnifiedTopoology: true 
        })
 .then((error) => {
            if (error) {
                console.log(error)
                return process.exit(1)
            }
            app.listen(PORT, () => {
            console.log(`Server running in on port ${PORT}`.yellow.bold)
        });

});