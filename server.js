// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// // const session = require('express-session');
// // Import express-handlebars
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });

// const sequelize = require('./config/connection')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// // Set up the express app
// const app = express();
// const PORT = process.env.PORT || 3002;
// // const PORT = 3001;

// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };
  
//   app.use(session(sess));

// // Set Handlebars.js as the default template engine
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

// // app.get('/', (req, res) => (
// //     res.send("Hello World!")
// // ))

// sequelize.sync({ force: true }).then(() => {
//     app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
// });

// app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));

const path = require('path');
const express = require('express');
// const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });


// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };

// app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const forceTables = process.env.FORCETABLES === 'true' ? true : false;

sequelize.sync({ force: forceTables }).then(() => {
  app.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});