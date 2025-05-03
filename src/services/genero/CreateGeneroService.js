import { createGenero } from '../../repositories/genero.repository.js';
import validaDatos from './validaDatos.js';

const createGeneroService = async (data) => {
    validaDatos(data);    
    return await createGenero(data);
}

export default createGeneroService;