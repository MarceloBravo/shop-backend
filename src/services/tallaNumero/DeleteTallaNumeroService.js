import { deleteTallaNumero } from '../../repositories/tallaNumero.repository.js';

const deleteTallaNumeroService = async ({id}) => {
    try{
        return await deleteTallaNumero(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteTallaNumeroService;