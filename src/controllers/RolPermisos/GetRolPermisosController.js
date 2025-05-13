import getRolPermisosService from "../../services/RolPermisos/GetRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

const getRolPermisosControlPermisosler = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getRolPermisosService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getRolPermisosControlPermisosler;