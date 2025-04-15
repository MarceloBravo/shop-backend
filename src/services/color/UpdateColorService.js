import { updateColor } from '../../repositories/color.repository.js';

const updateColorService = async (id, data) => {
    try{
        const { nombre, valor } = data;
        const [ color, created ] = await updateColor({where:{id}, defaults: data});
        color.nombre = nombre;
        color.valor = valor;
        color.deleted_at = null;

        await color.save();

        return [color, created];
    } catch (error) {
        throw new Error("Error al actualizar la categoría: " + error.message);
    }
}

export default updateColorService;