import createCategoriaService from '../../services/Categoria/CreateCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const createCategoriaController = async (req, res) => {
    try {
        const data = await createCategoriaService(req.body);
        res.json({ data, mensaje: 'La categoría ha sido creada exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createCategoriaController;