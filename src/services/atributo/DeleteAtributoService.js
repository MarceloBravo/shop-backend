import { deleteAtributo } from '../../repositories/atributo.repository.js';

const deleteAtributoService = async ({id}) => {
    try{
        return await deleteAtributo(id);
    } catch (error) {
        throw new Error("Error al eliminar el atributo: " + error.message);
    }
}

export default deleteAtributoService;