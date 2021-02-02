const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res, next) => {
    console.log(req);
    res.render('index');
});

app.get('/formulario', (req, res, next) => {
    res.render('formulario');
});

app.get('/sobre', (req, res, next) => {
    res.render('sobre');
});

app.listen(port, () => {
    console.log('The server is running at http://localhost:' + port);
});