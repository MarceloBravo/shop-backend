import GeneroRepository from '../../repositories/GeneroRepository.js';

/**
 * Servicio para obtener todos los registros de género
 * @class GetAllGeneroService
 */
class GetAllGeneroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de géneros
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los registros de género
     * @param {boolean} [paranoid=true] - Indica si se deben excluir los registros eliminados
     * @returns {Promise<Object>} Objeto con los registros y el total
     */
    execute = async (paranoid = true) => {
        const {data, count} = await this.repository.getAll(paranoid);
        return {data, count};
    }
}

export default GetAllGeneroService;