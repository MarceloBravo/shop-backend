import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una subcategoría.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de actualizar una subcategoría en la base de datos.
 * */
class UpdateSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una subcategoría existente.
     * @param {number} id - ID de la subcategoría a actualizar.
     * @param {Object} data - Datos actualizados de la subcategoría.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La subcategoría actualizada.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateSubCategoriaService;