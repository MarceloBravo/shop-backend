import { createMenu } from '../../repositories/menu.repository.js';
import validaDatos from './validaDatos.js';

const createMenuService = async (data) => {
    validaDatos(data);
    return await createMenu(data);
}

export default createMenuService;