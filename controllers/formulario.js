const fs = require('fs');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

const sexoModel = require('../models/sexo-model');
const estadoCivilModel = require('../models/estado-civil-model');

const getPage = (req, res, next) => {

    // Sexo
    const sexoItensViewModel = sexoModel.getAllSexo().map((item) => {
        return {
            value: item.id,
            label: item.descricao
        }
    })

    // Estado Civil
    const estadoCivilItensViewModel = estadoCivilModel.getAllEstadoCivil().map((item) => {
        return {
            value: item.id,
            label: `${item.id} - ${item.descricao}`
        }
    })
    
    // ViewModel
    const getViewModel = {
        sexo: sexoItensViewModel,
        estadoCivil: estadoCivilItensViewModel
    }

    res.render('formulario', getViewModel);
}

const postPage = (req, res, next) => {

    const body = req.body;

    // cria a viewModel
    const postViewModel = {
        name: body.name,
        email: body.email,
        birthDate: body.birthDate,
        sexo: sexoModel.getSexoPorId(body.gender).descricao,
        estadoCivil: estadoCivilModel.getEstadoCivilPorId(body.maritalStatus).descricao
    }

    // une a viewModel com o html
    var htmlText = fs.readFileSync('./views/formulario-pdf.ejs', 'utf-8');
    var htmlRenderized = ejs.render(htmlText, postViewModel);

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