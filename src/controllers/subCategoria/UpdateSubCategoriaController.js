import updateSubCategoriaService from "../../services/subCategoria/UpdateSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

const updateSubCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateSubCategoriaService(id, req.body);
        res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateSubCategoriaController;