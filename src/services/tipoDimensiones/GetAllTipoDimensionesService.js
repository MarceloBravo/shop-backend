import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';

/**
 * Servicio para obtener todos los  tipo de dimensión (tipo de medida)
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tipo de dimensión (tipo de medida)
 * @description Esta clase se encarga de obtener todos los tipo de dimensión (tipo de medida) de la base de datos.
 * */
class GetAllTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los tipos de dimensiones
     * @param {boolean} [paranoid=true] - Si se incluyen los registros eliminados
     * @returns {Promise<Array>} Lista de tipos de dimensiones
     * @returns {Promise<Array>} - Lista de tipos de medidas (dimensiones).
     */
    async execute(paranoid = true) {
        return await this.repository.getAll([['nombre', 'ASC']], paranoid);
    }
}

export default GetAllTipoDimensionesService;