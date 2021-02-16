const data = [
    { id: '1', label: 'MPLS' },
    { id: '2', label: 'Dedicated Internet Access' },
    { id: '3', label: 'Broadband Internet Access' }
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
