const fs = require('fs');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

const servicesModel = require('../models/services-model');
const bandwidthModel = require('../models/bandwidth-model');
const states = require('../json/states.json');
const pricesMPLS = require('../json/pricesMPLS.json');
const pricesDIA = require('../json/pricesDIA.json');
const pricesBBD = require('../json/pricesBBD.json')

const getPage = (req, res, next) => {

    // Services
    const servicesItemViewModel = servicesModel.getAllServices().map((item) => {
        return {
            value: item.id,
            label: item.label
        }
    })
    
    // Bandwidth
    const bandwidthItemViewModel = bandwidthModel.getAllBandwidth().map((item) => {
        return {
            value: item.id,
            label: item.label
        }
    })

    // States
    const statesItemViewModel = states.UF.map((item) => {
        return {
            value: item.sigla,
            label: item.nome
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
    let priceOTCWithoutTaxes = parseFloat(body.priceOTC).toFixed(2);
    let priceMRCWithoutTaxes = parseFloat(body.priceMRC).toFixed(2);

    // Formata o preço conforme solicitação do usuário
    // Se escolheu "1" será customizado e usará os preços digitados no form
    // que já foram puxados nas linhas acima
    // Se escolheu "2" será os valores da tabela do serviço
    if (body.priceType === "2") {
        // Verifica qual o serviço para consultar na tabela adequada
        let newMRC = 0;
        if (body.service === "MPLS") {
            newMRC = pricesMPLS.find(item => (item.bandwidth === body.bandwidth)).mrc;
        } else if (body.service === "Dedicated Internet Access") {
            newMRC = pricesDIA.find(item => (item.bandwidth === body.bandwidth)).mrc;
        } else if (body.service === "Broadband Internet Access") {
            newMRC = pricesBBD.find(item => (item.bandwidth === body.bandwidth)).mrc;
        }
        priceMRCWithoutTaxes = parseFloat(newMRC).toFixed(2);
        priceOTCWithoutTaxes = 1000.00;
    }

    let impostoICMS = states.UF.find(item => (item.sigla === body.state)).icms;
    let impostoFatorDivisor = parseFloat(1 - ((impostoICMS + 3.0 + 0.65) / 100)).toFixed(4);
    const priceOTCWithTaxes = parseFloat(priceOTCWithoutTaxes / 0.8575).toFixed(2);
    const priceMRCWithTaxes = parseFloat(priceMRCWithoutTaxes / impostoFatorDivisor).toFixed(2);

    // cria a viewModel
    const postViewModel = {
        company: body.company,
        name: body.name, 
        email: body.email,
        address: body.address,
        city: body.city,
        state: body.state,
        service: body.service,
        bandwidth: body.bandwidth,
        priceType: body.priceType,
        priceOTCWithoutTaxes,
        priceMRCWithoutTaxes,
        priceOTCWithTaxes,
        priceMRCWithTaxes
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