import { getGenero } from '../../repositories/genero.repository.js';

const getGeneroService = async (id) => {
    try{
        return await getGenero(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getGeneroService;