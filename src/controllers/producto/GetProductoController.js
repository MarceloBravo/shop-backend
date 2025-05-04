import getProductoService from "../../services/producto/GetProductoService.js";
import { handleError } from "../../shared/functions.js";

const getProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getProductoService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getProductoController;