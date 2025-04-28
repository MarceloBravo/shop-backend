import updateTallaLetraService from "../../services/tallaLetra/UpdateTallaLetraService.js";
import { handleError } from "../../shared/functions.js";

const updateTallaLetraController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateTallaLetraService(id, req.body);
        res.json({marca: result.marca, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateTallaLetraController;