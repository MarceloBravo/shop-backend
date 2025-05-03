import getAllUsuarioService from '../../services/usuario/GetAllUsuarioService.js';
import { handleError } from "../../shared/functions.js";

const getAllUsuarioContusuarioler = async (req, res) => {
    try {
        const data = await getAllUsuarioService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllUsuarioContusuarioler;