import deleteRolService from '../../services/Rol/DeleteRolService.js';
import { handleError } from "../../shared/functions.js";

const deleteRolController = async (req, res) => {
    try {
        const {id, result } = await deleteRolService(req.params);
        const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminar o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteRolController;