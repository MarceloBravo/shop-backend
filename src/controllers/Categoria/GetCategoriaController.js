import getCategoriaService from "../../services/Categoria/GetCategoriaService";
import { handleError } from "../../shared/functions.js";

const getCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getCategoriaService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getCategoriaController;