import getPageTipoDimensionesService from "../../services/tipoDimensiones/GetPageTipoDimensionesService.js";
import { handleError } from "../../shared/functions.js";

const getPageTipoDimensionesController = async (req, res) => {
    try{
        const { pag = 1, limit = 10 } = req.params;
        const { rows , count, totPag } = await getPageTipoDimensionesService(pag, limit);
        res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getPageTipoDimensionesController;