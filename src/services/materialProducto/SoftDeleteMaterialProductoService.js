import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';

/**
 * Servicio para eliminar la relación entre un material y un producto de forma suave.
 * @class SoftDeleteMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales productos.
 * @description Esta clase se encarga desasignar un material de un producto con soft-delete.
 * */
class SoftDeleteMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una marca de forma suave (soft delete) de la base de datos.
     * @param {number} id - ID de la marca a eliminar.
     * @returns {Promise<number>} - Devuelve el estado: 1 si se eliminó, 0 si no se encontró.
     * */
    execute = async (id, transaction = null) => {
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}


export default SoftDeleteMaterialProductoService;