import HardDeleteCategoriaService from '../../services/Categoria/HardDeleteCategoriaService.js';
import { handleError } from "../../shared/functions.js";

class HardDeleteCategoriaController {
    constructor(service = new HardDeleteCategoriaService()) {
        this.service = service;
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const { result } = await this.service.delete(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}   

export default HardDeleteCategoriaController;