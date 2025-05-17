import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';

class GetAllDimensionesProductoService{
    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository
    }

    /**
     * Obtiene todos los registros de dimensiones de producto
     * @param {boolean} paranoid - Si se deben incluir registros eliminados
     * @returns {Promise<Array>} - Lista de registros de dimensiones de producto
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllDimensionesProductoService;