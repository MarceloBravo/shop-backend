import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';

/**
 * Servicio para obtener una talla letra por su ID
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de obtener una talla letra por su ID.
 * */
class GetByIdTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una talla letra por su ID.
     * @param {number} id - ID de la talla letra.
     * @param {boolean} [paranoid=true] - Si es true, incluye registros eliminados.
     * @returns {Promise<Object>} - La talla letra encontrada.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdTallaLetraService;
