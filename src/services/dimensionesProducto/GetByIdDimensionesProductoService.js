import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';

class GetByIdDimensionesProductoService {
    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene un registro de dimensiones de producto por su ID
     * @param {number} id - ID del registro a obtener
     * @param {Transaction} transaction - Transacción opcional
     * @param {boolean} paranoid - Si se deben incluir registros eliminados
     * @returns {Promise<Object>} - El registro de dimensiones de producto
     */
    execute = async (id, transaction = null, paranoid = true) => {
        return await this.repository.getById(id, transaction, paranoid);
    }
}   

export default GetByIdDimensionesProductoService;