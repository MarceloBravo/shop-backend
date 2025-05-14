import GetPageRolService from "../../services/Rol/GetPageRolService.js";
import { handleError } from "../../shared/functions.js";

class GetPageRolController{

    constructor(service = new GetPageRolService()){
        this.service = service;
    }

    getPageRol = async (req, res) => { 
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag} = await this.service.getPageRol(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageRolController;