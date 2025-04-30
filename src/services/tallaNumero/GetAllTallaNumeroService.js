import { getAllTallaNumero } from '../../repositories/tallaNumero.repository.js';

const getAllTallaNumeroService = async () => {
    try{
        return await getAllTallaNumero();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllTallaNumeroService;