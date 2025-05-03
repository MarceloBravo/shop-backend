import createUsuarioService from '../../services/usuario/CreateUsuarioService.js';
import { handleError } from "../../shared/functions.js";

const createUsuarioContusuarioler = async (req, res) => {
    try {
        const data = await createUsuarioService(req.body);
        res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createUsuarioContusuarioler;