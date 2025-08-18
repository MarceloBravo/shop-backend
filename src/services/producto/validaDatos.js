import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';
import GeneroRepository from '../../repositories/GeneroRepository.js';
import MarcaRepository from '../../repositories/MarcaRepository.js';

export const validaDatos = async (data) => {
    const errors = [];
    const { sku, nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio } = data;
    
    if(!sku || sku.trim().length === 0 || sku.length > 100){
        errors.push("El SKU ingresado no es válido, ingresa un SKU de hasta 100 carácteres.");
    }
    if(!nombre || nombre.trim().length === 0 || nombre.length > 100){
        errors.push("El nombre ingresado no es válido, ingresa un nombre de hasta 100 carácteres.");
    }
    if(!descripcion || descripcion.trim().length === 0){
        errors.push("La descripción es obligatoria, ingresa una descripción.");
    }
    if(!sub_categoria_id || isNaN(sub_categoria_id) || await ((new SubCategoriaRepository()).getById(sub_categoria_id)) === null){
        errors.push("La subcategoria ingresada no es váida o no existe, ingresa una subcategoría válida.");
    }
    if(!genero_id || isNaN(genero_id) ||  await ((new GeneroRepository()).getById(genero_id)) === null){
        errors.push("El genero ingresado no es válido o no existe, ingresa un genero válido.");
    }
    if(!marca_id || isNaN(marca_id) || await ((new MarcaRepository()).getById(marca_id)) === null){
        errors.push("La marca ingresada no es válida o no existe, ingresa una marca válida.");
    }
    if(!precio || isNaN(precio) || precio < 0){
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