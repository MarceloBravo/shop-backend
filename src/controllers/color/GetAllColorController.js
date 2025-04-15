import GetAllColorService from '../../services/color/GetAllColorsService.js';

const getAllColorController = async (req, res) => {
    try{
        const data = await GetAllColorService();
        res.json(data);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default getAllColorController;

