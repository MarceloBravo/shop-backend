import updateColorService from "../../services/color/UpdateColorService.js";
import { handleError } from "../../shared/functions.js";

const updateColorController = async (req, res) => {
    try{
        const { id } = req.params;
        const [ color, created ] = await updateColorService(id, req.body);
        res.json({color, mensaje: `Registro ${created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateColorController;