import CreateRolService from '../../services/Rol/CreateRolService.js';
import { handleError } from "../../shared/functions.js";

class CreateRolController{

    constructor(service = new CreateRolService()){
        this.controller = service;
    }

    createRol = async (req, res) => {
        try {
            const data = await this.controller.createRol(req.body);
            res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   
}

export default CreateRolController;