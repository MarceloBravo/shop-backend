import updateColorService from "../../services/color/UpdateColorService.js";
import { handleError } from "../../shared/functions.js";

const updateColorController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateColorService(id, req.body);
        res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateColorController;