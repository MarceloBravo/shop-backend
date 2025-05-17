import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';

class GetAllAtributoProductoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   
    
    /**
     * Obtiene todos los registros de AtributoProducto
     * @param {boolean} paranoid - Si es true, incluye los registros eliminados lógicamente.
     * @returns {Promise<Array>} - Lista de registros de AtributoProducto.
     */ 
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllAtributoProductoService;