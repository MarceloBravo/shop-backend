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

export function getDifferences(obj1, obj2) {
    const diferencias = {
      nuevos: [],
      eliminados: [],
      modificados: []
    };
  
    compararRecursivo(obj1, obj2, diferencias, []);
  
    return diferencias;
  }
  
  
  function compareJSON(a, b) {
    return JSON.stringify(a).localeCompare(JSON.stringify(b));
  }

  export const comparaProductos = (obj1, obj2) => {
    let eliminados = comparaObjetos(obj1, obj2);
    let distintos = comparaObjetos(obj1, obj2, [], 2);
    let nuevos = comparaObjetos(obj2, obj1, []);

    return {eliminados, distintos, nuevos};
    
  }

  const comparaObjetos = (obj1, obj2, diferencias = [], tipoComparacion = 1) => {
    const prevKeys = Object.keys(obj1);

    prevKeys.forEach(key => {
        if(Array.isArray(obj1[key])){
            comparaArrays(obj1[key], obj2[key], diferencias, tipoComparacion, key);
        }else if(typeof obj1[key] === 'object'){
            comparaObjetos(obj1[key], obj2[key], diferencias, tipoComparacion);
        }else{
            if(
                //(tipoComparacion === 1 && obj1[key] && !obj2[key]) || 
                (tipoComparacion === 2 && obj2[key] && compareJSON(obj1[key],obj2[key]))
            ){
                diferencias.push({[key]: obj1[key]});
            }
        }
    });
    return diferencias;
  }

  const comparaArrays = (prevArr, newArr, diferencias, tipoComparacion, key) => {
    let dif = []
    prevArr.forEach((element, id) => {
        const item = newArr.find(e => e.id = element.id);
        if(
            (tipoComparacion === 1 && !item) || 
            (tipoComparacion === 2 && item && compareJSON(item, element))
        ){
            dif.push(element);
        }
    });
    if(dif.length > 0){
        diferencias.push({[key]: dif});
    }
  }
