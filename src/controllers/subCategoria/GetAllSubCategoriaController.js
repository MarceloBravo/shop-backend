import getAllSubCategoriaService from '../../services/subCategoria/GetAllSubCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const getAllSubCategoriaController = async (req, res) => {
    try {
        const data = await getAllSubCategoriaService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllSubCategoriaController;