import { getTallaNumero } from '../../repositories/tallaNumero.repository.js';

const getTallaNumeroService = async (id) => {
    try{
        return await getTallaNumero(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getTallaNumeroService;