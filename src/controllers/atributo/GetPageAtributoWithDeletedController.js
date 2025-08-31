import GetPageAtributoService from "../../services/atributo/GetPageAtributoService.js";
import { handleError } from "../../shared/functions.js";

class GetPageAtributoWithDeletedController{
    
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetPageAtributoService(repository);
    }

    execute = async (req, res) => {
        try{
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageAtributoWithDeletedController;