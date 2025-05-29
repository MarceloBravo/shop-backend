import  ColorProductoRepository from '../../repositories/ColorProductoRepository.js';
import validaDatos from './validaDatos.js';

class CreateColorProductoService{
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (data, transaction = null) => {
        await validaDatos(data, true, transaction);
        return await this.repository.create(data, transaction);
    }   
}


export default CreateColorProductoService;