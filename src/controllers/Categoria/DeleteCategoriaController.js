import deleteCategoriaService from '../../services/Categoria/DeleteCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const deleteCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteCategoriaService(id);
        res.json({ data, mensaje: 'El registro ha sido eliminado exitosamente.' });
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteCategoriaController;