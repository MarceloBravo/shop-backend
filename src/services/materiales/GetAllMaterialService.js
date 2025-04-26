import { getAllMaterial } from '../../repositories/material.repository.js';

const getAllMaterialService = async () => {
    try{
        return await getAllMaterial();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllMaterialService;