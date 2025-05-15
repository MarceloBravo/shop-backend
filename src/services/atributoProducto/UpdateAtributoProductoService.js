import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';
import validaDatos from './validaDatos.js';

class updateAtributoProductoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   
    
    /**
     * @param {number} id - ID del registro a actualizar
     * @param {object} data - Datos a actualizar
     * @param {object} transaction - Objeto de transacción (opcional)
     * @returns {Promise<number>} - Devuelve 200 si el registro fue actualizado correctamente, 404 si no se encontró
     */
    async update(id, data, transaction = null) {
        validaDatos(data);
        const record = await this.repository.update(id, data, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }       
}


export default updateAtributoProductoService;