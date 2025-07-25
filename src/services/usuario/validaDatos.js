import { validaRut } from "../../shared/functions.js";

export const validaDatos = (data, isUpdate = false) => {
    let errors = [];
    const { rut, nombres, apellido1, apellido2, avatar, direccion, fono, email, user_name, password, refresh_token } = data;
    if (validaRut(rut) === false) {
        errors.push("El rut ingresado no es válido.");
    }
    if (!nombres || nombres.trim().length === 0 || nombres.length > 50) {
        errors.push("Ingresa un valor válido para el nombre.");
    }
    if (!apellido1 || apellido1.trim().length === 0 || apellido1.length > 50) {
        errors.push("El primer apellido es obligatorio, ingresa un valor válido para el primer apellido.");
    }
    if (apellido2 && (apellido2.trim().length === 0 || apellido2.length > 50)) {
        errors.push("Ingresa un valor válido para el segundo apellido.");
    }
    if (avatar && (avatar.trim().length === 0 || avatar.length > 255)) {
        errors.push("Ingresa un valor válido para el avatar.");
    }
    if (!direccion || direccion.trim().length === 0 || direccion.length > 255) {
        errors.push("El campo dirección es obligatorio, ingresa un valor válido para la dirección.");
    }
    if (!fono || fono.trim().length === 0 || fono.length > 20) {
        errors.push("El campo fono es obligatorio, ingresa un valor válido para el fono.");
    }
    if (!email || email.trim().length === 0 || email.length > 30) {
        errors.push("El campo email es obligatorio, ingresa un valor válido para el email.");
    }
    if (!user_name || user_name.trim().length === 0 || user_name.length > 30) {
        errors.push("El campo nombre de usuario es obligatorio, ingresa un valor válido para el nombre de usuario.");
    }
    if (((!isUpdate && !password) || (isUpdate && password)) && (password && (password.trim().length === 0 || password.length > 150))) {
        errors.push((isUpdate ? "Contraseña no válida, " : "La contraseña es obligatoria, ") + "ingresa un valor válido para el campo contraseña.");
    }
    if (refresh_token && refresh_token.trim().length === 0) {
        errors.push("Ingresa un valor válido para el refresh token.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
    
}
