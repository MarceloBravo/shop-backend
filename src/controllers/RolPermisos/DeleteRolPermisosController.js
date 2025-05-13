import deleteRolPermisosService from '../../services/RolPermisos/DeleteRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

const deleteRolPermisosControlPermisosler = async (req, res) => {
    try {
        const {id, result } = await deleteRolPermisosService(req.params);
        const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminar o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteRolPermisosControlPermisosler;