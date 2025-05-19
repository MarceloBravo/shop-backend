import MarcaRepository from '../../repositories/MarcaRepository.js';

/**
 * Clase para eliminar una marca de forma suave.
 * @class HardDeleteMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de eliminar una marca de forma suave de la base de datos.
 */
class SoftDeleteMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una marca de forma suave (soft delete) de la base de datos.
     * @param {number} id - ID de la marca a eliminar.
     * @returns {Promise<number>} - Devuelve el código de estado HTTP (200 si se eliminó, 404 si no se encontró).
     * */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return record
    }
}

export default SoftDeleteMarcaService;