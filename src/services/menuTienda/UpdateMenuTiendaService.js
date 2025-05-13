import { updateMenuTienda } from '../../repositories/menuTienda.repository.js';
import validaDatos from './validaDatos.js';

const updateMenuTiendaService = async (id, data) => {
    validaDatos(data, id);
    const result = await updateMenuTienda(id, data);
    return result;
}

export default updateMenuTiendaService;