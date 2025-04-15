import softDeleteColorService from "../../services/color/SoftDeleteColorService.js";

export const softDeleteColorController = async (req, res) => {
    try{
        const { id } = req.params;
        const  result  = await softDeleteColorService(id);
        res.json(result);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default softDeleteColorController;