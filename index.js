const express = require('express');
const hbs = require('express-handlebars');

const {clientRouter} = require("./routes/client");

const app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('hbs', hbs.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');


app.use('/client', clientRouter)


app.listen(3000, '0.0.0.0', () => {
    console.log('Server is listening')
})