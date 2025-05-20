import PantallaRepository from '../../repositories/PantallaRepository.js';

/**
 * Clase para obtener una pantalla a partir de su ID.
 * @class GetByIdPantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de pantallas.
 * @description Esta clase se encarga de obtener una pantalla a partir de su ID.
 */
class GetByIdPantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una pantalla por su ID.
     * @param {number} id - ID del menú a obtener.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo pantallas no eliminadas.
     * @returns {Promise<Object>} - La pantalla encontrado.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }

}

export default GetByIdPantallaService;