import { getAllColor } from '../../repositories/color.repository.js';

const GetAllColorService = async () => {
    try{
        return await getAllColor();
    }catch (error) {
        throw new Error("Error al obtener los colores: " + error.message);
    }
}

export default GetAllColorService;