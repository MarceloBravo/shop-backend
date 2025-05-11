const validaDatos = (data) => {
    const errors = []
    const { producto_id, atributo_id } = data;
    if(!producto_id){
        errors.push("El id de uno o más productos no ha sido recibido.");
    }
    if(!atributo_id){
        errors.push("El id de uno o más atributos no ha sido recibido.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }

    return data
}

export default validaDatos;