import MaterialRepository from '../../repositories/MaterialRepository.js';


/**
 * Clase para eliminar un material de forma suave.
 * @class SoftDeleteMaterialService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de eliminar un material de forma suave de la base de datos con soft-delete.
 */
class SoftDeleteMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * Elimina un material de forma suave (soft delete) de la base de datos.
     * @param {number} id - ID del material a eliminar.
     * @returns {Promise<number>} - Devuelve el código de estado HTTP (200 si se eliminó, 404 si no se encontró).
     * */
    execute = async (id, transaction = null) => {
            const { result } = await this.repository.softDelete(id, transaction);
            return result;
    }
}

export default SoftDeleteMaterialService;