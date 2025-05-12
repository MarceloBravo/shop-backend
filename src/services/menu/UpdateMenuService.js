import { updateMenu } from '../../repositories/menu.repository.js';
import validaDatos from './validaDatos.js';

const updateMenuService = async (id, data) => {
    validaDatos(data, id);
    const result = await updateMenu(id, data);
    return result;
}

export default updateMenuService;