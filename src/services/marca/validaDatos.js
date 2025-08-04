const validaDatos = (data) => {
    let errors = [];
    const { nombre, logo } = data;
    if(!nombre || nombre.trim().length ===  0 || nombre.length > 30){
        errors.push("El nombre de la marca es obligatorio y debe tener un máximo de hasta 30 carácteres.");
    }
    if(logo && logo.trim().length > 500){
        errors.push("La ruta del logo es demasiado extensa, ubica la imagen en una carpeta mas accesible.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default validaDatos;