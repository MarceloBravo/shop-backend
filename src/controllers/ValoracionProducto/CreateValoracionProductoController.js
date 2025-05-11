import createValoracionProductoService from '../../services/ValoracionProducto/CreateValoracionProductoService.js';

import { handleError } from "../../shared/functions.js";

const createValoracionProductoControler = async (req, res) => {
    try {
        const data = await createValoracionProductoService(req.body);
        res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}   

export default createValoracionProductoControler;