import getCategoriaService from "../../services/Categoria/GetCategoriaService";

export const getCategoriaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getCategoriaService(id);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}