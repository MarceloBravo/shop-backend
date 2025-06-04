import MarcaRepository from '../../repositories/MarcaRepository.js';

/**
 * Servicio para obtener todas las marcas
 * @class GetAllMarcaService
 */
class GetAllMarcaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de marcas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las marcas
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas
     * @returns {Promise<Array>} Lista de marcas
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMarcaService;