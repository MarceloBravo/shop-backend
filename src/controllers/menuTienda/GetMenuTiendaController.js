import getMenuTiendaService from '../../services/menuTienda/GetMenuTiendaService.js';
import { handleError } from "../../shared/functions.js";

const getMenuTiendaController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getMenuTiendaService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getMenuTiendaController;
