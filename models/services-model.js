const data = [
    {
        id: '1',
        descricao: 'MPLS'
    },
    {
        id: '2',
        descricao: 'Dedicated Internet Access'
    },
    {
        id: '3',
        descricao: 'Broadband Internet Access'
    }
]

const getById = (id) => {
    return data.find((item) => item.id === id);
}

const getAll = () => {
    return data;
}

module.exports = {
    getAllServices: getAll,
    getServicesById: getById
}
