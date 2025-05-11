import getAllValoracionProductoService from '../../services/ValoracionProducto/GetAllValoracionProductoService.js';
import { handleError } from "../../shared/functions.js";

const getAllValoracionProductoControler = async (req, res) => {
    try {
        const data = await getAllValoracionProductoService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllValoracionProductoControler;