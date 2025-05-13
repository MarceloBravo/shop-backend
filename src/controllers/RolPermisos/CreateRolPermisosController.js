import createRolPermisosService from '../../services/RolPermisos/CreateRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

const createRolPermisosControlPermisosler = async (req, res) => {
    try {
        const data = await createRolPermisosService(req.body);
        res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createRolPermisosControlPermisosler;