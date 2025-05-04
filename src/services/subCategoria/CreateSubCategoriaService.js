import { createSubCategoria } from '../../repositories/subCategoria.repository.js';
import validaDatos from './validaDatos.js';

const createSubCategoriaService = async (data) => {
    await validaDatos(data);
    return await createSubCategoria(data);
}

export default createSubCategoriaService;