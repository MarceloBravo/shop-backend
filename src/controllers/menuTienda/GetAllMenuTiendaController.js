import GetAllMenuTiendaService from '../../services/menuTienda/GetAllMenuTiendaService.js';
import { handleError } from "../../shared/functions.js";

const getAllMenuTiendaController = async (req, res) => {
    try{
        const data = await GetAllMenuTiendaService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllMenuTiendaController;

