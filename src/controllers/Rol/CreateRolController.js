import createRolService from '../../services/Rol/CreateRolService.js';
import { handleError } from "../../shared/functions.js";

const createRolController = async (req, res) => {
    try {
        const data = await createRolService(req.body);
        res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createRolController;