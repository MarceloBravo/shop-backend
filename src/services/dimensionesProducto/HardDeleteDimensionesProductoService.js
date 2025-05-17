import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';

class HardDeleteDimensionesProductoService{
    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository
    }

    /**
     * Elimina un registro de dimensiones de producto de forma permanente
     * @param {number} id - ID del registro a eliminar
     * @param {Transaction} transaction - Transacción opcional
     * @returns {Promise<Object>} - El registro eliminado
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }   
}


export default HardDeleteDimensionesProductoService;