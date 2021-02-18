// modulos e constantes
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const formularioCtrl = require("./controllers/formulario");
const precoCtrlMPLS = require('./controllers/precoMPLS');
const precoCtrlDIA = require('./controllers/precoDIA');
const precoCtrlBBD = require('./controllers/precoBBD');
const port = process.env.PORT || 5000;

// inicia o app e define alguns parâmetros
const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

// *** ROTAS INÍCIO ***
app.get("/", (req, res, next) => { res.render("index"); });
// rotas formulario
app.get("/formulario", formularioCtrl.getFormulario);
app.post("/formulario", formularioCtrl.postFormulario);
// rotas tabelas de preços
app.get("/precos", (req, res, next) => { res.render("precos"); });
app.get("/precosMPLS", precoCtrlMPLS.getFormulario);
app.post("/precosMPLS", precoCtrlMPLS.postFormulario);
app.get("/precosDIA", precoCtrlDIA.getFormulario);
app.post("/precosDIA", precoCtrlDIA.postFormulario);
app.get("/precosBBD", precoCtrlBBD.getFormulario);
app.post("/precosBBD", precoCtrlBBD.postFormulario);
// rota sobre
app.get("/sobre", (req, res, next) => { res.render("sobre"); });
// *** ROTAS FIM ***

// porta
app.listen(port, () => {
  console.log("The server is running at http://localhost:" + port);
});