const data = [
    {
        id: '1',
        descricao: 'Masculino'
    },
    {
        id: '2',
        descricao: 'Feminino'
    }
]

const getById = (id) => {
    return data.find((item) => item.id === id);
}

const getAll = () => {
    return data;
}

module.exports = {
    getAllSexo: getAll,
    getSexoPorId: getById
}
