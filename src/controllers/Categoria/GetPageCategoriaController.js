import getPageCategoriaService from "../../services/Categoria/GetPageCategoriaService.js";

export const getPageCategoriaController = async (req, res) => { 
    try {
        const { page = 1, limit = 10 } = req.query;
        const { rows , count, registrosPorPagina, pag } = await getPageCategoriaService(page, limit);
        res.json({data: {rows, count, regPag: registrosPorPagina, pag}});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}