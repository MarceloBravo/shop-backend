import updateTipoDimensionesService from "../../services/tipoDimensiones/UpdateTipoDimensionesService.js";
import { handleError } from "../../shared/functions.js";

const updateTipoDimensionesController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateTipoDimensionesService(id, req.body);
        res.json({marca: result.marca, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateTipoDimensionesController;