import { getTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const getTipoDimensionesService = async (id) => {
    try{
        return await getTipoDimensiones(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getTipoDimensionesService;