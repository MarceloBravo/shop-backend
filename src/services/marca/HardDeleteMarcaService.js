import MarcaRepository from '../../repositories/MarcaRepository.js';

/**
 * Clase para eliminar una marca de forma permanente.
 * @class HardDeleteMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de eliminar una marca de forma permanente de la base de datos.
 */
class HardDeleteMarcaService{

    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una marca de forma permanente de la base de datos.
     * @param {number} id - ID de la marca a eliminar.
     * @param {Transaction} transaction - Transacción de Sequelize para manejar la eliminación de la marca.
     * @returns {Promise<Object>} - Devuelve un objeto con el ID de la marca eliminada y el resultado de la operación.
     * */
    execute = async (id, transaction = null) => {
        const result = await this.repository.hardDelete(id, transaction);
        return result;
    }
}

export default HardDeleteMarcaService;