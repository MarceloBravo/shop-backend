import updateColorService from "../../services/color/UpdateColorService.js";

export const updateColorController = async (req, res) => {
    try{
        const { id } = req.params;
        const [ color, created ] = await updateColorService(id, req.body);
        res.json({color, mensaje: `Registro ${created ? 'creado' : 'actualizado'} exitosamente.`})
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default updateColorController;