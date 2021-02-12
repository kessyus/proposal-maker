const fs = require('fs');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

const servicesModel = require('../models/services-model');
const bandwidthModel = require('../models/bandwidth-model');
const states = require('../json/states.json');

const getPage = (req, res, next) => {

    // Services
    const servicesItemViewModel = servicesModel.getAllServices().map((item) => {
        return {
            value: item.id,
            label: item.descricao
        }
    })    
    
    // Bandwidth
    const bandwidthItemViewModel = bandwidthModel.getAllBandwidth().map((item) => {
        return {
            value: item.id,
            label: item.descricao
        }
    })

    // States
    const statesItemViewModel = states.UF.map((item) => {
        return {
            value: item.id,
            label: item.sigla
        }
    })

    // ViewModel
    const getViewModel = {
        services: servicesItemViewModel,
        bandwidth: bandwidthItemViewModel,
        state: statesItemViewModel
    }

    res.render('formulario', getViewModel);
}

const postPage = (req, res, next) => {

    const body = req.body;

    // cria a viewModel
    const postViewModel = {
        name: body.address
        // email: body.email,
        // birthDate: body.birthDate,
        // sexo: sexoModel.getSexoPorId(body.gender).descricao,
        // estadoCivil: estadoCivilModel.getEstadoCivilPorId(body.maritalStatus).descricao
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