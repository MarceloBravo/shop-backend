import updateGeneroService from "../../services/genero/UpdateGeneroService.js";
import { handleError } from "../../shared/functions.js";

const updateGeneroController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateGeneroService(id, req.body);
        res.json({genero: result.genero, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateGeneroController;