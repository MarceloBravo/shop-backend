import getAllRolService from '../../services/Rol/GetAllRolService.js';
import { handleError } from "../../shared/functions.js";

const getAllRolController = async (req, res) => {
    try {
        const data = await getAllRolService();
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllRolController;