import updateMenuTiendaService from "../../services/menuTienda/UpdateMenuTiendaService.js";
import { handleError } from "../../shared/functions.js";

const updateMenuTiendaController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateMenuTiendaService(id, req.body);
        res.json({menuTienda: result.menuTienda, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateMenuTiendaController;