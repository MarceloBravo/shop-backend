import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';

/**
 * Servicio para eliminar permanentemente una talla numérica
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de eliminar permanentemente una talla numérica de la base de datos.
 * */
class HardDeleteTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Elimina un tipo de dimensiones (soft delete)
     * @param {number} id - ID del tipo de dimensiones a eliminar
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const result = await this.repository.hardDelete(id, transaction);
        return { id, result };
    }

}

export default HardDeleteTipoDimensionesService;