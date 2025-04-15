import createCategoriaService from '../../services/Categoria/CreateCategoriaService.js';

export const createCategoriaController = async (req, res) => {
    try {
        const data = await createCategoriaService(req.body);
        res.json({ data, mensaje: 'La categoría ha sido creada exitosamente.' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}   