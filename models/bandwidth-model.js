const data = [
    {
        id: '1',
        descricao: '1 Mbps'
    },
    {
        id: '2',
        descricao: '2 Mbps'
    },
    {
        id: '3',
        descricao: '3 Mbps'
    },
    {
        id: '4',
        descricao: '4 Mbps'
    },
    {
        id: '5',
        descricao: '5 Mbps'
    },
    {
        id: '6',
        descricao: '6 Mbps'
    },
    {
        id: '7',
        descricao: '7 Mbps'
    },
    {
        id: '8',
        descricao: '8 Mbps'
    },
    {
        id: '9',
        descricao: '9 Mbps'
    },
    {
        id: '10',
        descricao: '10 Mbps'
    },
    {
        id: '20',
        descricao: '20 Mbps'
    },
    {
        id: '30',
        descricao: '30 Mbps'
    },
    {
        id: '40',
        descricao: '40 Mbps'
    },
    {
        id: '50',
        descricao: '50 Mbps'
    },
    {
        id: '60',
        descricao: '60 Mbps'
    },
    {
        id: '70',
        descricao: '70 Mbps'
    },
    {
        id: '80',
        descricao: '80 Mbps'
    },
    {
        id: '90',
        descricao: '90 Mbps'
    },
    {
        id: '100',
        descricao: '100 Mbps'
    },
    {
        id: '200',
        descricao: '200 Mbps'
    },
    {
        id: '300',
        descricao: '300 Mbps'
    },
    {
        id: '400',
        descricao: '400 Mbps'
    },
    {
        id: '500',
        descricao: '500 Mbps'
    },
    {
        id: '600',
        descricao: '600 Mbps'
    },
    {
        id: '700',
        descricao: '700 Mbps'
    },
    {
        id: '800',
        descricao: '800 Mbps'
    },
    {
        id: '900',
        descricao: '900 Mbps'
    },
    {
        id: '1000',
        descricao: '1 Gbps'
    },
    {
        id: '2000',
        descricao: '2 Gbps'
    },
    {
        id: '3000',
        descricao: '3 Gbps'
    },
    {
        id: '4',
        descricao: '4 Gbps'
    },
    {
        id: '5',
        descricao: '5 Gbps'
    },
    {
        id: '6',
        descricao: '6 Gbps'
    },
    {
        id: '7',
        descricao: '7 Gbps'
    },
    {
        id: '8',
        descricao: '8 Gbps'
    },
    {
        id: '9',
        descricao: '9 Gbps'
    },
    {
        id: '10',
        descricao: '10 Gbps'
    }
]

const getById = (id) => {
    return data.find((item) => item.id === id);
}

const getAll = () => {
    return data;
}

module.exports = {
    getAllBandwidth: getAll,
    getBandwidthById: getById
}
