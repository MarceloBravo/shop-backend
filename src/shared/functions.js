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
        message = "Error: " + e.message;
    }
    code = parseInt(e.parent?.code ? 400 : e.code ?? 500);
    return {code,error: message, details: e.details ?? []};
}

export function validaRut(rut) {
    if (!rut) return false;
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * cuerpo.charAt(i);
        multiplo = (multiplo === 7) ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    return (dv === (dvEsperado === 10 ? 'K' : dvEsperado.toString()));
}

export function validaEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
