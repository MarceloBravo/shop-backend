import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';

/**
 * Servicio para obtener todas las asociaciones de tallas de letra y productos
 * @class
 * @description Gestiona la recuperación de todas las asociaciones entre productos y tallas de letra
 */
class GetAllTallaLetraProductoService {
    /**
     * Crea una instancia del servicio de listado
     * @param {TallaLetraProductoRepository} repository - Repositorio de tallas de letra de productos
     */
    constructor(repository = new TallaLetraProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todas las asociaciones entre productos y tallas de letra
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * @returns {Promise<Array<Object>>} Lista de todas las asociaciones encontradas
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}


export default GetAllTallaLetraProductoService;