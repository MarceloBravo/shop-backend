import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';

/**
 * Servicio para eliminar permanentemente una talla numérica
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de eliminar permanentemente una talla numérica de la base de datos.
 * */
class HardDeleteTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Elimina permanentemente una talla numérica.
     * @param {number} id - ID de la talla numérica.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la eliminación.
     * */
    execute = async (id, transaction = null) => {
        const result = await this.repository.hardDelete(id, transaction);
        return { id, result };
    }
}

export default HardDeleteTallaNumeroService;
