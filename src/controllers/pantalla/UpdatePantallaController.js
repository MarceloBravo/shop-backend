import updatePantallaService from "../../services/pantalla/UpdatePantallaService.js";
import { handleError } from "../../shared/functions.js";

const updatePantallaController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updatePantallaService(id, req.body);
        res.json({pantalla: result.pantalla, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updatePantallaController;