import getPageCategoriaService from "../../services/Categoria/GetPageCategoriaService.js";
import { handleError } from "../../shared/functions.js";

const getPageCategoriaController = async (req, res) => { 
    try {
        const { page = 1, limit = 10 } = req.query;
        const { rows , count, registrosPorPagina, pag } = await getPageCategoriaService(page, limit);
        res.json({data: {rows, count, regPag: registrosPorPagina, pag}});
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getPageCategoriaController;