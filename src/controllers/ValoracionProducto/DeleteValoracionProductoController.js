import deleteValoracionProductoService from '../../services/ValoracionProducto/DeleteValoracionProductoService.js';
import { handleError } from "../../shared/functions.js";

const deleteValoracionProductoControler = async (req, res) => {
    try {
        const {id, result } = await deleteValoracionProductoService(req.params);
        const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminar o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteValoracionProductoControler;