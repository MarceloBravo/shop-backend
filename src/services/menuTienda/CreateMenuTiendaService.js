import { createMenuTienda } from '../../repositories/menuTienda.repository.js';
import validaDatos from './validaDatos.js';

const createMenuTiendaService = async (data) => {
    validaDatos(data);
    return await createMenuTienda(data);
}

export default createMenuTiendaService;