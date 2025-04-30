import updateTallaNumeroService from "../../services/tallaNumero/UpdateTallaNumeroService.js";
import { handleError } from "../../shared/functions.js";

const updateTallaNumeroController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateTallaNumeroService(id, req.body);
        res.json({marca: result.marca, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateTallaNumeroController;