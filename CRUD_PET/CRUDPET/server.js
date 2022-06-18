require('./models/db');

import express from 'express';
import { join } from 'path';
import exphbs from 'express-handlebars';
import { urlencoded, json } from 'body-parser';

import PetController from './controllers/PetController';

var app = express();
app.use(urlencoded({
    extended: true
}));
app.use(json());
app.set('views', join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/Pet', PetController);