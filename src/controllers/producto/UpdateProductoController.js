import updateProductoService from "../../services/producto/UpdateProductoService.js";
import { handleError } from "../../shared/functions.js";

const updateProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateProductoService(id, req.body);
        res.json({data: result.record, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateProductoController;