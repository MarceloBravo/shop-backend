import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';

class HardDeleteAtributoProductoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   
    
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}


export default HardDeleteAtributoProductoService;