import MenuRepository from '../../repositories/MenuRepository.js';
import { getPantalla } from '../../repositories/pantalla.repository.js' 

const validaDatos = async (data, id = null) => {
    let errors = [];
    const { nombre, icono, menu_padre_id, pantalla_id } = data;
    
    if(id && id == menu_padre_id){
        errors.push("El menu no puede ser menu padre de si mismo, selecciona otro menú padre.");
    }
    if(!nombre || nombre.trim().length ===  0 || nombre.length > 30){
        errors.push("El nombre del menu es obligatorio y debe tener un máximo de hasta 50 carácteres.");
    }
    if(icono && icono.trim().length > 500){
        errors.push("La ruta del icono es demasiado extensa, ubica la el icono delmenu en una carpeta mas accesible.");
    }
    if(menu_padre_id && (await (new MenuRepository()).getMenu(menu_padre_id)) == null){
        errors.push("El menú padre no existe o no fue encontrado, selecciona un menú padre válido.");
    }
    if(pantalla_id && getPantalla(pantalla_id) == null){
        errors.push("La pantalla seleccionada no eiste o no es válida, selecciona una pantalla válida.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}


export default validaDatos;