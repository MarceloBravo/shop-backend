import GetPageColorService from "../../services/color/GetPageColorService.js";
import { handleError } from "../../shared/functions.js";

class GetPageColorWithDeletedController{
    constructor(service = new GetPageColorService()){
        this.service = service;
    }

    getPage = async (req, res)  => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag } = await this.service.getPage(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}


export default GetPageColorWithDeletedController;