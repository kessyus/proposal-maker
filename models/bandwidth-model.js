const band = require('../json/bandwidth.json');
const data = band.bandwidth;

const getById = (id) => {
    return data.find((item) => item.id === id);
};

const getAll = () => {
    return data;
};

module.exports = {
    getAllBandwidth: getAll,
    getBandwidthById: getById
};
