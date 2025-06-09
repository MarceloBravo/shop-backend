import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';

/**
 * Servicio para obtener una dimensión de producto por su ID
 * @class GetByIdDimensionesProductoService
 */
class GetByIdDimensionesProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de dimensiones de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una dimensión de producto por su ID
     * @param {string|number} id - ID de la dimensión de producto a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la dimensión de producto si está eliminada
     * @returns {Promise<Object>} Dimensión de producto encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Dimensión de producto no encontrada');
        }
        return result;
    }
}

export default GetByIdDimensionesProductoService;