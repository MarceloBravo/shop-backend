import { deleteMarca } from '../../repositories/marca.repository.js';

const deleteMarcaService = async ({id}) => {
    try{
        return await deleteMarca(id);
    } catch (error) {
        throw new Error("Error al eliminar la marca: " + error.message);
    }
}

export default deleteMarcaService;