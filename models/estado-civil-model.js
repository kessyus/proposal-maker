const data = [
    {
        id: '1',
        descricao: 'Solteiro(a)'
    },
    {
        id: '2',
        descricao: 'Casado(a)'
    },
    {
        id: '3',
        descricao: 'Divorciado(a)'
    },
    {
        id: '4',
        descricao: 'Viuvo(a)'
    },
    {
        id: '5',
        descricao: 'Separado Judicialmente'
    }
]

const getById = (id) => {
    return data.find((item) => item.id === id);
}

const getAll = () => {
    return data;
}

module.exports = {
    getAllEstadoCivil: getAll,
    getEstadoCivilPorId: getById
}
