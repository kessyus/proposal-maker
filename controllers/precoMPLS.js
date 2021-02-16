const fs = require('fs');
const ejs = require('ejs');

const prices = require('../json/pricesMPLS.json');

const getPage = (req, res, next) => {

    // Prices MPLS
    const pricesItemViewModelMPLS = prices.map((item) => {
        return {
            id: item.id,
            bandwidth: item.bandwidth,
            mrc: item.mrc
        }
    })

    // ViewModel
    const getViewModel = {
        priceMPLS: pricesItemViewModelMPLS
    }

    res.render('precosMPLS', getViewModel);
}

const postPage = (req, res, next) => {

    const body = req.body;
    const size = body.id.length;
    let data = [];
    
    // cria JSON
    for (let i=0; i<size; i++) {
        data.push({"id": body.id[i], "bandwidth": body.bandwidth[i], "mrc": body.mrc[i]});
    }

    // cria a viewModel
    data = JSON.stringify(data, null, 2);

    // altera os novos valores no JSON
    fs.writeFile('json/pricesMPLS.json', data, (err) => {
        if (err) return console.log(err);
    })

    res.render("precos");
}

module.exports = {
    getFormulario: getPage,
    postFormulario: postPage
}