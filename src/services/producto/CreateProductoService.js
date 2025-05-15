import ProductoRepository from '../../repositories/ProductoRepository.js';
import validaDatos from './validaDatos.js';

class CreateProductoService{

    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }   

    async create(data, transaction = null) {
        await validaDatos(data);
        const newRecord = await this.repository.create(data, transaction);
        return newRecord;
    }
}

export default CreateProductoService;