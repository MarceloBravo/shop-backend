import updateCategoriaService from "../../services/Categoria/UpdateCategoriaService.js";
import { handleError } from "../../shared/functions.js";

const updateCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateCategoriaService(id, req.body);
        res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateCategoriaController;