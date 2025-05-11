import createProductoOrchestrator from '../../orchestrators/producto/CreateProductoOrchestrator.js';
import { handleError } from "../../shared/functions.js";

const createProductoController = async (req, res) => {
    try {
        const result = await createProductoOrchestrator(req.body);
        res.json({ result, mensaje: 'El producto ha sido registrado exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createProductoController;