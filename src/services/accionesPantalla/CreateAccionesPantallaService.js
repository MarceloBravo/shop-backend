import { createAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';
import validaDatos from './validaDatos.js';

const createAccionesPantallaService = async (data, transaccion = null) => {
    validaDatos(data);
    return await createAccionesPantalla(data, transaccion);
}

export default createAccionesPantallaService;