import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';

/**
 * Servicio para realizar un borrado lógico de una talla numérica
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de realizar el borrado lógico de una talla numérica.
 * */
class SoftDeleteTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza el borrado lógico de una talla numérica.
     * @param {number} id - ID de la talla numérica.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<number>} - 200 si se eliminó, 404 si no se encontró.
     * */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }
}

export default SoftDeleteTallaNumeroService;