import getAllProductoService from '../../services/producto/GetAllProductoService.js';
import { handleError } from "../../shared/functions.js";

const getAllProductoController = async (req, res) => {
    try {
        const data = await getAllProductoService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllProductoController;