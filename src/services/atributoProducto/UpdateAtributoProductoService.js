import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';
import validaDatos from './validaDatos.js';

class UpdateAtributoProductoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   
    
    /**
     * @param {number} id - ID del registro a actualizar
     * @param {object} data - Datos a actualizar
     * @param {object} transaction - Objeto de transacción (opcional)
     * @returns {Promise<number>} - Devuelve 200 si el registro fue actualizado correctamente, 404 si no se encontró
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const record = await this.repository.update(id, data, transaction);
        return record;
    }       
}


export default UpdateAtributoProductoService;