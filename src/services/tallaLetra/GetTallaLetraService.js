import { getTallaLetra } from '../../repositories/tallaLetra.repository.js';

const getTallaLetraService = async (id) => {
    try{
        return await getTallaLetra(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getTallaLetraService;