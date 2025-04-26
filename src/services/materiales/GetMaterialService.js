import { getMaterial } from '../../repositories/material.repository.js';

const getMaterialService = async (id) => {
    try{
        return await getMaterial(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getMaterialService;