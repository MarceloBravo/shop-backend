import { updateAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';
import validaDatos from './validaDatos.js';

const updateAccionesPantallaService = async (id, data, transaction = null) => {
    validaDatos(data, true);
    const result = await updateAccionesPantalla(id, data, transaction);
    return result;
}

export default updateAccionesPantallaService;