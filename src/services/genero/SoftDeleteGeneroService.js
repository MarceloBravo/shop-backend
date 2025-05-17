import GeneroRepository from '../../repositories/GeneroRepository.js';

class SoftDeleteGeneroService{
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    /**
     * @param {number} id - ID del genero a eliminar
     * @param {boolean} [transaction=true] - Si se debe realizar la transacción
     * @returns {Promise<*>} - Promesa que se resuelve con el genero eliminado
     */
    execute = async (id, transaction = true) => {
        const record = await this.repository.softDelete(id, transaction);
        return record;
    }
}

export default SoftDeleteGeneroService;