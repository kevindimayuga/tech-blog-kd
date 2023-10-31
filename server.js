// import all necessary packages, files, etc.
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// This will create the express app and set up the port
const app = express();
const PORT = process.env.PORT || 3001;

// This will set up the handlebars engine with custom helpers
const hbs = exphbs.create({ helpers });
