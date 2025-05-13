import getAllRolPermisosService from '../../services/RolPermisos/GetAllRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

const getAllRolPermisosControlPermisosler = async (req, res) => {
    try {
        const data = await getAllRolPermisosService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllRolPermisosControlPermisosler;