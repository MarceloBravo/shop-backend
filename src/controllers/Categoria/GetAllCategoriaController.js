import getAllCategoriaService from '../../services/Categoria/GetAllCategoriaService.js';

export const getAllCategoriaController = async (req, res) => {
    try {
        const data = await getAllCategoriaService();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}