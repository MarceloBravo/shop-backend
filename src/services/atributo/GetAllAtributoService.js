import { getAllAtributo } from '../../repositories/atributo.repository.js';

const getAllAtributoService = async () => {
    try{
        return await getAllAtributo();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllAtributoService;