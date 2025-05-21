import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';

/**
 * Servicio para obtener todas las tallas numéricas
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de obtener todas las tallas numéricas de la base de datos.
 * */
class GetAllTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todas las tallas numéricas.
     * @param {boolean} [paranoid=true] - Si es true, excluye registros eliminados.
     * @returns {Promise<{data: Array, count: number}>} - Lista de tallas numéricas y total.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['valor', 'ASC']], paranoid);
    }
}

export default GetAllTallaNumeroService;