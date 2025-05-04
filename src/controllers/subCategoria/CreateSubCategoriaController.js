import createSubCategoriaService from '../../services/subCategoria/CreateSubCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const createSubCategoriaController = async (req, res) => {
    try {
        const data = await createSubCategoriaService(req.body);
        res.json({ data, mensaje: 'La categoría ha sido creada exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createSubCategoriaController;