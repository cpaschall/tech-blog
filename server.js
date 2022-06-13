const express = require("express");
// Import express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

// Set up the express app
const app = express();
const PORT = process.env.PORT || 3001;
// const PORT = 3001;

// Set Handlebars.js as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/blog-routes'));

// app.get('/', (req, res) => (
//     res.send("Hello World!")
// ))

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`))