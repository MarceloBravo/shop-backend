import { softDeleteMaterial } from '../../repositories/material.repository.js';

const softDeleteMaterialService = async (id) => {
    try {
        const record = await softDeleteMaterial(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteMaterialService;