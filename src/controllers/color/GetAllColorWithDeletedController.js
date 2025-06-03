import GetAllColorService from '../../services/color/GetAllColorsService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

class GetAllColorWithDeletedController {
    constructor(repository = new ColorRepository()) {
        this.service = new GetAllColorService(repository);
    }

    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}

export default GetAllColorWithDeletedController;

