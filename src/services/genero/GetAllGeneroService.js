import { getAllGenero } from '../../repositories/genero.repository.js';

const getAllGeneroService = async () => {
    try{
        return await getAllGenero();
    }catch (error) {
        throw new Error("Error al obtener el listado de registros: " + error.message);
    }
}

export default getAllGeneroService;