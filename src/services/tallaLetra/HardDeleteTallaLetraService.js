import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';

/**
 * Servicio para eliminar permanentemente un registros de tallas letra
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de eliminar permanentemente un regístro de tallas letra de la base de datos.
 * */
class HardDeleteTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Elimina permanentemente un registro de talla letra
     * @param {number} id - ID de la talla letra a eliminar
     * @param {import('sequelize').Transaction} [transaction] - Transacción de Sequelize opcional
     * @throws {NotFoundError} Si no se encuentra la talla letra
     */
    execute = async (id, transaction = null) => {
        const result = await this.repository.hardDelete(id, transaction);
        return { id, result };
    }
}

export default HardDeleteTallaLetraService;
