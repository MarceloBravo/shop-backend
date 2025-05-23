import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';

/**
 * Servicio para obtener un registro de peso de producto por su ID
 * @class
 * @description Gestiona la recuperación de registros individuales de peso de productos
 */
class GetByIdPesoProductoService {
    /**
     * Crea una instancia del servicio de búsqueda por ID de peso de producto
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene un registro de peso de producto por su ID
     * @param {number} id - Identificador único del registro de peso
     * @param {boolean} [paranoid=true] - Si es true, solo busca registros no eliminados (soft delete)
     * @returns {Promise<Object>} Registro de peso encontrado
     * @throws {Error} Si no se encuentra el registro o hay un error en la búsqueda
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdPesoProductoService;