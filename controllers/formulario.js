const getPage = (req, res, next) => {
    res.render('formulario');
}

const postPage = (req, res, next) => {
    res.send({
        mensagem: "teste POST JSON"
    });
}

module.exports = {
    getFormulario: getPage,
    postFormulario: postPage
}