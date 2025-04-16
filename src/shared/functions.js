import bcrypt from 'bcrypt'

export const encriptarPassword = async (pwd) => {
    const saltRounds = 10;
    let password = await bcrypt.hash(pwd, saltRounds).then(function(hash) {
        return hash
    });    

    return password
}

//Convierte un objeto tipo fecha al formato Día/Mes/Año 
export const dateToStringDMY = (fecha, separador = '/') => {
    return [
        numToString(fecha.getDate(), 2), 
        numToString(fecha.getMonth() + 1, 2), 
        numToString(fecha.getFullYear(), 4)
    ].join(separador)
}

export const dateToStringYMD = (fecha, separador = '/') => {
    return [
        numToString(fecha.getFullYear(), 4),
        numToString(fecha.getMonth() + 1, 2), 
        numToString(fecha.getDate(), 2)
    ].join(separador)
}

//Toma un número y lo convierte a texto, retornando un string cuya longitud la determina el parametro longitud
//El string devuelto es rellenado con un carácter de relleno a su izquierda
export const numToString = (num, longitud, relleno = '0') => {
    return num.toString().padStart(longitud, relleno)
}

export const handleError = (e) => {
    let message, code;
    if(e.parent?.code === '23505'){
        message = "Ya existe un registro con el valor ingresado.";
    }else{
        message = "Error al crear el registro: " + e.message;
    }
    code = parseInt(e.parent?.code ? 400 : e.code);
    return {code,error: message, details: e.details ?? []};
}
