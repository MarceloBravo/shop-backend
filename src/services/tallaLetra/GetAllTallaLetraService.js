import { getAllTallaLetra } from '../../repositories/tallaLetra.repository.js';

const getAllTallaLetraService = async () => {
    try{
        return await getAllTallaLetra();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllTallaLetraService;