import getPageColorService from "../../services/color/GetPageColorService.js";
import { handleError } from "../../shared/functions.js";

const getPageColorController = async (req, res) => {
    try{
        const { page, limit } = req.query;
        const { rows , count, registrosPorPagina, pag } = await getPageColorService(page, limit);
        res.json({data: {rows, count, regPag: registrosPorPagina, pag}});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getPageColorController;