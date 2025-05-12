import updateMenuService from "../../services/menu/UpdateMenuService.js";
import { handleError } from "../../shared/functions.js";

const updateMenuController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateMenuService(id, req.body);
        res.json({menu: result.menu, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateMenuController;