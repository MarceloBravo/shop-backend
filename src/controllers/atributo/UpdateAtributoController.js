import updateAtributoService from "../../services/atributo/UpdateAtributoService.js";
import { handleError } from "../../shared/functions.js";

const updateAtributoController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await updateAtributoService(id, req.body);
        res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default updateAtributoController;