import softDeleteCategoriaService from "../../services/Categoria/SoftDeleteCategoriaService";

const softDeleteCategoriaController = async (req, res) => {
    try {
        try{
            const { id } = req.params;
            const  result  = await softDeleteCategoriaService(id);
            res.json(result);
        }catch(e){
            res.status(500).json({error: e.message});
        }

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}