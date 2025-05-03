import getUsuarioService from "../../services/usuario/GetUsuarioService.js";
import { handleError } from "../../shared/functions.js";

const getUsuarioContusuarioler = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUsuarioService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getUsuarioContusuarioler;