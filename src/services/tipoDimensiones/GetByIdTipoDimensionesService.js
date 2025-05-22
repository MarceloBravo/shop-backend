import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';

/**
 * Servicio para obtener un tipo de dimensión por su ID.
 * @class
 * @constructor
 * @param {TipoDimensionesRepository} repository - Repositorio de tipos de dimensiones.
 * @description Esta clase se encarga de obtener un tipo de dimensión específico de la base de datos.
 * */
class GetByIdTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene un tipo de dimensión por su ID.
     * @param {number} id - ID del tipo de dimensión a buscar.
     * @param {boolean} [paranoid=true] - Si es true, excluye registros eliminados.
     * @returns {Promise<Object>} - El tipo de dimensión encontrado.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdTipoDimensionesService;
