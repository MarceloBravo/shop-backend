import MarcaRepository from '../../repositories/MarcaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Clase para eliminar una marca de forma permanente.
 * @class HardDeleteMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de eliminar una marca de forma permanente de la base de datos.
 * */
class UpdateMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una marca en la base de datos.
     * @param {number} id - ID de la marca a actualizar.
     * @param {Object} data - Objeto que contiene los nuevos datos de la marca.
     * @param {Transaction} transaction - Transacción de Sequelize para manejar la actualización de la marca.
     * @returns {Promise<Object>} - Devuelve la marca actualizada.
     * */

    execute = async (id, values, transaction = null) => {
        validaDatos(values);
        const record = await this.repository.update(id, values, transaction);
        return record;
    }
}

export default UpdateMarcaService;