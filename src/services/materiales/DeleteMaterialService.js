import { deleteMaterial } from '../../repositories/material.repository.js';

const deleteMaterialService = async ({id}) => {
    try{
        return await deleteMaterial(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteMaterialService;