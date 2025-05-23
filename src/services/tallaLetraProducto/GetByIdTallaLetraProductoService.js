import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';

/**
 * Servicio para obtener una asociación de talla de letra y producto por su ID
 * @class
 * @description Gestiona la recuperación de asociaciones específicas entre productos y tallas de letra
 */
class GetByIdTallaLetraProductoService {
    /**
     * Crea una instancia del servicio de búsqueda por ID
     * @param {TallaLetraProductoRepository} repository - Repositorio de tallas de letra de productos
     */
    constructor(repository = new TallaLetraProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una asociación específica entre producto y talla de letra
     * @param {number} id - ID de la asociación a buscar
     * @param {boolean} [paranoid=true] - Si es true, solo busca registros no eliminados (soft delete)
     * @returns {Promise<Object>} La asociación encontrada
     * @throws {Error} Si no se encuentra el registro o hay un error en la búsqueda
     */
    async execute(id, paranoid = true) {
        const result = await this.repository.getById(id, paranoid);
        return result;
    }
}

export default GetByIdTallaLetraProductoService;