const validaDatos = (data) => {
    let errors = [];
    const { nombre } = data;
    if (!nombre || nombre.trim().length === 0 || nombre.length > 30) {
        errors.push("Ingresa un nombre válido.");
    }
    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
    
}

export default validaDatos;