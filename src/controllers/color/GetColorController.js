import getColorService from '../../services/color/GetColorService.js';

const getColorController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getColorService(id)
        res.json(data);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default getColorController;