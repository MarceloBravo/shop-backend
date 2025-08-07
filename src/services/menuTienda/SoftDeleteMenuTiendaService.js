/**
 * Servicio para marcar como borrado  un menú de la tienda en la base de datos.
 * @class GetAllMenuService
 */
class SoftDeleteMenuTiendaService{
     /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     * @throws {Error} Si el repositorio no es proporcionado
     */
     constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Elimina un menú de la tienda de forma suave (soft delete).
     * @param {number} id - ID del menú de la tienda a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina un menú de la tienda de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            const error = new Error('Registro Menu-Pantalla no encontrado');
            error.code = 404;
            throw error;
        }
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}


export default SoftDeleteMenuTiendaService;