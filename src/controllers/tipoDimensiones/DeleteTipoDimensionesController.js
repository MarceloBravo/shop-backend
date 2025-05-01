import deleteTipoDimensionesService from '../../services/tipoDimensiones/DeleteTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

const deleteTipoDimensionesController = async (req, res) => {
    try{
        const {id, result } = await deleteTipoDimensionesService(req.params);
        const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteTipoDimensionesController;