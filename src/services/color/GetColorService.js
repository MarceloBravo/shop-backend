import { getColor } from '../../repositories/color.repository.js';

const getColorService = async (id) => {
    try{
        return await getColor(id);
    }catch (error) {
        throw new Error("Error al obtener el color: " + error.message);
    }
}

export default getColorService;