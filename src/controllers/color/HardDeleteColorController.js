import HardDeleteColorService from '../../services/color/HardDeleteColorService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

class HardDeleteColorController {
    constructor(repository = new ColorRepository()) {
        this.service = new HardDeleteColorService(repository);
    }

    execute = async (req, res) => {
        try {
            const {id} = req.params;
            const resp = await this.service.execute(id);
            const mensaje = resp.result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
            res.json({ id, code: resp.result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteColorController;