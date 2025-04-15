import { createCategoria } from "../../repositories/categoria.repository";

const createCategoriaService = async (data) => {
    validateData(data);
    return await createCategoria(data);
}

const validateData = (data) => {
    const { nombre, descripcion } = data;
    if (nombre === null || nombre.trim().length === 0 || nombre.length < 30) {
        throw new Error("Ingresa un nombre válido para el nombre de la categoría.");
    }
    if (descripcion === null || descripcion.trim().length === 0) {
        throw new Error("Ingresa un valor válido para la descripción de la categoría.");
    }
}

export default createCategoriaService;