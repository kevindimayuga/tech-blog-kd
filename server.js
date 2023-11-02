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

// This will set up the session with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // This will set the session to expire in 5 minutes
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// This will manage user sessions in the app
app.use(session(sess));

// This will tell express which template engine to use and
// handlebars will be used as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// This will set up the express app to handle data parsing and
// serve static files and urlencoded data to the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// This will tell the server to use the routes defined in the controllers folder
app.use(routes);

// This will sync the sequelize models to the database and then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
