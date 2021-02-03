// modulos e constantes
const express = require('express');
const path = require('path');
const formularioCtrl = require('./controllers/formulario');
const port = process.env.PORT || 5000;

// inicia o app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// rotas
app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/formulario', formularioCtrl.getFormulario);
app.post('/formulario', formularioCtrl.postFormulario);

app.get('/sobre', (req, res, next) => {
    res.render('sobre');
});

// porta
app.listen(port, () => {
    console.log('The server is running at http://localhost:' + port);
});