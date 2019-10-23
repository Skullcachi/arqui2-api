const express = require('express');
const app = express();
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//settings
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 2);
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global Variables
app.use('/api', require('./routes/index'));
app.use('/dashboard', require('./routes/dashboard'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//Server start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});