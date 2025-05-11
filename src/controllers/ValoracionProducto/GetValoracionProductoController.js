import getValoracionProductoService from "../../services/ValoracionProducto/GetValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

const getValoracionProductoControler = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getValoracionProductoService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getValoracionProductoControler;