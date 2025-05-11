import updateProductoOrchestrator from "../../orchestrators/producto/UpdateProductoOrchestrator.js";
import { handleError } from "../../shared/functions.js";

const updateProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateProductoOrchestrator(id, req.body);
        res.json({data: result, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateProductoController;