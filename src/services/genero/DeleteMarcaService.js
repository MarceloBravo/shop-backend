import { deleteGenero } from '../../repositories/genero.repository.js';

const deleteGeneroService = async ({id}) => {
    try{
        return await deleteGenero(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteGeneroService;