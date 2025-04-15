import deleteColorService from '../../services/color/DeleteColorService.js';

export const deleteColorController = async (req, res) => {
    try{
        const {id, result } = await deleteColorService(req.params);
        res.json({id, mensaje: result ? 'Registro eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente'});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default deleteColorController;