//import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

const validaDatos = async (data) => {
    let errors = [];
    const { pantalla_id, permite_crear, permite_actualizar, permite_eliminar, permite_listar, acceso  } = data;

    //if(!pantalla_id || pantalla_id && await (new AccionesPantallaRepository()).getById(pantalla_id) === null){
    //    errors.push("La pantalla no es válida o no existe, ingresa una pantalla válida.");
    //}
    if(!pantalla_id){
        errors.push("Debes indicar la pantalla a configurar.");
    }
    if(permite_crear && (typeof permite_crear) !== 'boolean'){
        errors.push("El valor para el campo permite crear debe ser un boolean.");
    }
    if(permite_actualizar && (typeof permite_actualizar) !== 'boolean'){
        errors.push("El valor para el campo permite actualizar debe ser un boolean.");
    }
    if(permite_eliminar && (typeof permite_eliminar) !== 'boolean'){
        errors.push("El valor para el campo permite eliminar debe ser un boolean.");
    }
    if(permite_listar && (typeof permite_listar) !== 'boolean'){
        errors.push("El valor para el campo permite listar debe ser un boolean.");
    }
    if(acceso && (typeof acceso) !== 'boolean'){
        errors.push("El valor para el campo acceso debe ser un boolean.");
    }
    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }

    return data
}


const validaAccionesPantallas = (item, errors) => {
    

    return errors;
}

export default validaDatos;