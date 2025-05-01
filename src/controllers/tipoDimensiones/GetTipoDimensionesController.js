import getTipoDimensionesService from '../../services/tipoDimensiones/GetTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

const getTipoDimensionesController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getTipoDimensionesService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getTipoDimensionesController;
