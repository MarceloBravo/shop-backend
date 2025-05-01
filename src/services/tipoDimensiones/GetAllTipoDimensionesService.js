import { getAllTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const getAllTipoDimensionesService = async () => {
    try{
        return await getAllTipoDimensiones();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllTipoDimensionesService;