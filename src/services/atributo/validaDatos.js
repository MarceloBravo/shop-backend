
const validaDatos = (data, repository) => {
    let arrError = [];
    const { id, nombre, valor_string, valor_numerico } = data;
    
    if(id && repository.getById(id) === null){
        arrError.push("El atributo no es válido o no existe, especifíca un atributo válido.");
    }
    if((!nombre || `${nombre}`.length === 0) && !valor_string && !valor_numerico){
        arrError.push("No se han especificado datos válidos.");
    }
    if((!nombre || `${nombre}`.length === 0 || `${nombre}`.length > 100)){
        arrError.push("El valor ingresado para el nombre del atributo no es válido.");
    }
    if(!valor_string && !valor_numerico){
        arrError.push("Debes ingresar un valor para el atributo texto o numérico.");
    }
    if(valor_numerico && (isNaN(valor_numerico) === true || valor_numerico <= 0)){
        arrError.push("El valor ingresado para el atributo numérico no es válido. Ingresa sólo números positivos.");
    }

    if(arrError.length > 0){
        const error = new Error('Datos no válidos:')
        error.code = 400;
        error.details = arrError;
        throw error;
    }

    return data
}


const validaAtributos = (item, arrError) => {
    

    return arrError;
}

export default validaDatos;