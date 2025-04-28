import { deleteTallaLetra } from '../../repositories/tallaLetra.repository.js';

const deleteTallaLetraService = async ({id}) => {
    try{
        return await deleteTallaLetra(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteTallaLetraService;