import getAllCategoriaService from '../../services/Categoria/GetAllCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const getAllCategoriaController = async (req, res) => {
    try {
        const data = await getAllCategoriaService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllCategoriaController;