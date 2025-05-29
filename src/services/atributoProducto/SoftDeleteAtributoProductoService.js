import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';


class SoftDeleteAtributoProductoService{
    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   
    
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }       
}

export default SoftDeleteAtributoProductoService;