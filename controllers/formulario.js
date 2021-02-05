const fs = require('fs');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

const getPage = (req, res, next) => {
    res.render('formulario');
}

const postPage = (req, res, next) => {

    const body = req.body;

    // cria a viewModel
    const viewModel = {
        name: body.name,
        email: body.email,
        birthDate: body.birthDate
    }

    // une a viewModel com o html
    var htmlText = fs.readFileSync('./views/formulario-pdf.ejs', 'utf-8');
    var htmlRenderized = ejs.render(htmlText, viewModel);

    // define parametros e gera PDF
    let file = { content: htmlRenderized };
    let options = { format: 'A4' };
    html_to_pdf.generatePdf(file, options)
        .then(pdfBuffer => {
            res.contentType("application/pdf");
            res.send(pdfBuffer);
        });

}

module.exports = {
    getFormulario: getPage,
    postFormulario: postPage
}