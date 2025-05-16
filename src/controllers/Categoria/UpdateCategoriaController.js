import UpdateCategoriaService from "../../services/Categoria/UpdateCategoriaService.js";
import { handleError } from "../../shared/functions.js";

class UpdateCategoriaController {
    constructor(service = new UpdateCategoriaService()) {
        this.service = service;
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { data } = req.body;
            const result = await this.service.update(id, data );
            res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default UpdateCategoriaController;