import updateAccionesPantallaService from "../../services/accionesPantalla/UpdateAccionesPantallaService.js";
import { handleError } from "../../shared/functions.js";

const updateAccionesPantallaController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateAccionesPantallaService(id, req.body);
        res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateAccionesPantallaController;