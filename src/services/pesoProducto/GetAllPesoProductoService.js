import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';

/**
 * Servicio para obtener todos los registros de peso de productos
 * @class
 * @description Gestiona la recuperación de todos los registros de peso de productos en el sistema
 */
class GetAllPesoProductoService {
    /**
     * Crea una instancia del servicio de listado de pesos de productos
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los registros de peso de productos
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * @returns {Promise<Array<Object>>} Lista de registros de peso encontrados
     * @throws {Error} Si hay un error al obtener los registros
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllPesoProductoService;