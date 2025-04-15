import getPageColorService from "../../services/color/GetPageColorService.js";

export const getPageColorController = async (req, res) => {
    try{
        const { page, limit } = req.query;
        const { rows , count, registrosPorPagina, pag } = await getPageColorService(page, limit);
        res.json({data: {rows, count, regPag: registrosPorPagina, pag}});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default getPageColorController;