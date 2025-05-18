import MarcaRepository from '../../repositories/MarcaRepository.js';

/**
 * Clase para eliminar una marca de forma permanente.
 * @class HardDeleteMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * */
class GetByIdMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una marca por su ID.
     * @param {number} id - ID de la marca a obtener.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Object>} - Devuelve la marca encontrada.   
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdMarcaService;