import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';
import validaDatos from './validaDatos.js';

class CreateDimensionesProductoService{

    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository
    }
    
    /**
     * Crea un nuevo registro de dimensiones de producto
     * @param {Object} data - Datos del nuevo registro
     * @param {Transaction} transaction - Transacción opcional
     * @returns {Promise<Object>} - El nuevo registro creado
     */ 
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateDimensionesProductoService;