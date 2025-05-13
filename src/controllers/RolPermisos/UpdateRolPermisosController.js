import updateRolPermisosService from "../../services/RolPermisos/UpdateRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

const updateRolPermisosControlPermisosler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateRolPermisosService(id, req.body);
        res.json({rolPermisos: result.rolPermisos, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateRolPermisosControlPermisosler;