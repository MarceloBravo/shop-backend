export const mensaje = (code, mensaje = null) => {
    switch (code) {
        case 500:
            return mensaje ?? 'Error interno del servidor, por favor intente más tarde.';
        case 401:   
            return mensaje ?? 'No autorizado, por favor inicie sesión.';
        case 403:   
            return mensaje ?? 'Acceso denegado, no tiene permisos para realizar esta acción.';
        case 404:
        case 0:   
            return mensaje ?? 'No se encontró el recurso solicitado.';
        case 409:   
            return mensaje ?? 'Conflicto, el recurso ya existe o no se puede eliminar.';               
        case 400:
            return mensaje ?? 'Error en la petición, verifique los datos enviados.';
        case 200:
            return mensaje ?? 'Operación exitosa.';
        case 201: 
            return mensaje ?? 'Registro creado exitosamente.';
        case 202:   
            return mensaje ?? 'Registro actualizado exitosamente.';
        case 204:                   
            return mensaje ?? 'Registro borrado exitosamente.';
        default:
            return mensaje ?? 'Error desconocido';
    }
}