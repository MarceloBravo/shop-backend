import { getSubCategoria } from '../../repositories/subCategoria.repository.js';
import { getGenero } from '../../repositories/genero.repository.js';
import { getMarca } from '../../repositories/marca.repository.js';

export const validaDatos = async (data) => {
    const errors = [];
    const { nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio } = data;

    if(!nombre || nombre.trim().length === 0 || nombre.length > 100){
        errors.push("El nombre ingresado no es válido, ingresa un nombre de hasta 100 carácteres.");
    }
    if(!descripcion || descripcion.trim().length === 0){
        errors.push("La descripción es obligatoria, ingresa una descripción.");
    }
    if(!sub_categoria_id || parseInt(sub_categoria_id) === NaN || (await getSubCategoria(sub_categoria_id)) === null){
        errors.push("La subcategoria ingresada no es váida o no existe, ingresa una subcategoría válida.");
    }
    if(!genero_id || parseInt(genero_id) === NaN || (await getGenero(genero_id)) === null){
        errors.push("El genero ingresado no es válido o no existe, ingresa un genero válido.");
    }
    if(!marca_id || parseInt(marca_id) === NaN || (await getMarca(marca_id)) === null){
        errors.push("La marca ingresada no es válida o no existe, ingresa una marca válida.");
    }
    if(!precio || parseInt(precio) === NaN || precio <0){
        errors.push("El precio ingresado no es válido, ingresa un ptrecio mayor o igual a cero.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default validaDatos;