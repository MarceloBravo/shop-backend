import ColorProductoRepository from '../../repositories/ColorProductoRepository.js';
import validaDatos from './validaDatos.js';


class UpdateColorProductoService{
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (id, data, transaction = null) => {
        await validaDatos(data, true, transaction);
        return await this.repository.update(id, data, transaction);
    }       
}

export default UpdateColorProductoService;