import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';

class IsCheckInUseAtributoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 

    }
    
    isCheckInUseAtributoService = async (id) => {
        return await this.repository.isCheckInUse(id);
    }
}

export default IsCheckInUseAtributoService;