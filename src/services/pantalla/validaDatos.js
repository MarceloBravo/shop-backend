const validaDatos = (data) => {
    let errors = [];
    const { nombre, uri } = data;
    console.log(nombre, uri)
    if(!nombre || nombre.trim().length ===  0 || nombre.length > 30){
        errors.push("El nombre la pantalla es obligatorio y debe tener un máximo de hasta 30 carácteres.");
    }
    if(uri && uri.trim().length > 500){
        errors.push("La ruta del uri es demasiado extensa, ubica la imagen en una carpeta mas accesible.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}


export default validaDatos;