const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./src/database/connectionDB');

const tutorialsRouters = require('./src/routers/tutorial_routes');


const app = express();


/* === Middleware === */

// Load config dotenv
dotenv.config({ path: './config/config.env' });


// cors header
var corsOptions = {
    origin: 'http://localhost:8000'
};
app.use(cors(corsOptions));

// morgan: log request
app.use(morgan('tiny'));

// parse request of content type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to Database
connectDB();


/* === Set PORT listen for request === */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is runing in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
});


/* === ROUTES === */
app.use('/', tutorialsRouters);