import { getAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';

const getAccionesPantallaService = async (id) => {
    return await getAccionesPantalla(id);
}

export default getAccionesPantallaService;