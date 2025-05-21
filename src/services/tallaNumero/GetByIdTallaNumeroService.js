import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';

/**
 * Servicio para obtener una talla numérica por su ID
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de obtener una talla numérica por su ID.
 * */
class GetByIdTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una talla numérica por su ID.
     * @param {number} id - ID de la talla numérica.
     * @param {boolean} [paranoid=true] - Si es true, incluye registros eliminados.
     * @returns {Promise<Object>} - La talla numérica encontrada.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdTallaNumeroService;
