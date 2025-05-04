import deleteSubCategoriaService from '../../services/subCategoria/DeleteSubCategoriaService.js';
import { handleError } from "../../shared/functions.js";

const deleteSubCategoriaController = async (req, res) => {
    try {
        const {id, result } = await deleteSubCategoriaService(req.params);
        const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteSubCategoriaController;