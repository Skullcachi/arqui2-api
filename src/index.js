const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.port || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));

//Server start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});