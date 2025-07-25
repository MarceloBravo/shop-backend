const validaDatos = (data) => {
    let errors = [];
    const { valor } = data;

    if(!valor || valor.trim().length ===  0 || valor.length > 30){
        errors.push("El campo valor es obligatorio y debe tener un máximo de hasta 30 carácteres.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}


export default validaDatos;