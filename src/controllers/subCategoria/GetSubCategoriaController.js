import getSubCategoriaService from "../../services/subCategoria/GetSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

const getSubCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getSubCategoriaService(id);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getSubCategoriaController;