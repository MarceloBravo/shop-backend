import updateCategoriaService from "../../services/Categoria/UpdateCategoriaService.js";

export const updateCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await updateCategoriaService(id, req.body);
        res.json({color, mensaje: `Registro ${created ? 'creado' : 'actualizado'} exitosamente.`})
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}