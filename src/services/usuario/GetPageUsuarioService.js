import { getPageUsuario } from "../../repositories/usuario.repository.js";

const getPageUsuarioService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    try {
        const desde = (page - 1) * limit;
        const result = await getPageUsuario(desde, limit);    
        return result;
    } catch (error) {
        throw new Error("Error al obtener los regístros de la página: " + error.message);
    }
}

export default getPageUsuarioService;