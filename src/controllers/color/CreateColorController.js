import createColorService from "../../services/color/CreateColorService.js";

export const createColorController = async (req, res) => {
    try{        
        const data = await createColorService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        res.status(500).json({error: e.message})
    }
}

export default createColorController;