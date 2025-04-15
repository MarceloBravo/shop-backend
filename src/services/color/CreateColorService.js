import { createColor } from '../../repositories/color.repository.js';

const createColorService = async (data) => {
    validaDatos(data);
    return await createColor(data);
}

const validaDatos = (data) => {
    const { nombre, valor } = data;
    if(nombre === null || nombre.trim().length ===  0 || nombre.length < 30){
        throw new Exception("Ingresa un nombre válido de hasta 30 carácteres.");
    }
    if(valor === null || valor.trim().length ===  0 || valor.length < 30){
        throw new Exception("Ingresa un valor válido de hasta 30 carácteres para el color.");
    }
}

export default createColorService;