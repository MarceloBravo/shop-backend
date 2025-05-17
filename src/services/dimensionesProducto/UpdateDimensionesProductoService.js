import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';
import validaDatos from './validaDatos.js';


class UpdateDimensionesProductoService {
    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository;
    }   

    /**
     * Actualiza un registro de dimensiones de producto
     * @param {number} id - ID del registro a actualizar
     * @param {Object} data - Datos a actualizar
     * @param {Transaction} transaction - Transacción opcional
     * @returns {Promise<Object>} - El registro actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction); 
    }
}

export default UpdateDimensionesProductoService;