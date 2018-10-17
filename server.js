const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');
const PORT = 3000;

const userController = require('./controllers/users');
const imageController = require('./controllers/images');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/users', userController);
app.use('/images', imageController);

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.listen(PORT, () => {
	console.log('Listening on port, ' + PORT);
})