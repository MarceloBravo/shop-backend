import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';

/**
 * Servicio para obtener todas las tallas letra
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de obtener todas las tallas letra de la base de datos.
 * */
class GetAllTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todas las tallas letra.
     * @param {boolean} [paranoid=true] - Si es true, excluye registros eliminados.
     * @returns {Promise<{data: Array, count: number}>} - Lista de tallas letra y total.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['valor', 'ASC']], paranoid);
    }
}

export default GetAllTallaLetraService;