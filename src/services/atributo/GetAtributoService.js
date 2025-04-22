import { getAtributo } from '../../repositories/atributo.repository.js';

const getAtributoService = async (id) => {
    try{
        return await getAtributo(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getAtributoService;