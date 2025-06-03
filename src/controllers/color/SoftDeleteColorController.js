import SoftDeleteColorService from "../../services/color/SoftDeleteColorService.js";
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

class SoftDeleteColorController {
    constructor(repository = new ColorRepository()) {
        this.service = new SoftDeleteColorService(repository);
    }

    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}   

export default SoftDeleteColorController;