/**
 * Valida los datos de una talla numérica
 * @param {Object} data - Datos a validar
 * @param {boolean} [isUpdate=false] - Indica si es una actualización
 * @throws {Error} Si los datos no son válidos
 */
const validaDatos = (data) => {
    let errors = [];
    const { valor } = data;

    if (!valor || valor.toString().trim().length === 0) {
        errors.push("El campo valor es obligatorio.");
    }

    if (valor && (isNaN(valor) || valor < 0 || valor > 100)) {
        errors.push("El valor debe ser un número entre 0 y 100.");
    }

    if (errors.length > 0) {
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default validaDatos;
