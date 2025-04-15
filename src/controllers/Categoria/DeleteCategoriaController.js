import deleteCategoriaService from '../../services/Categoria/DeleteCategoriaService.js';

export const deleteCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteCategoriaService(id);
        res.json({ data, mensaje: 'El registro ha sido eliminado exitosamente.' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}