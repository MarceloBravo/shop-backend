import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';

/**
 * Servicio para obtener una relación talla numerica por su ID
 * @class GetByIdTallaNumeroProductoService
 * @constructor
 * @param {TallaNumeroProductoRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de obtener una relación talla numerica por su ID.
 * */
class GetByIdTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una relación talla numerica por su ID.
     * @param {number} id - ID de la relación talla numerica.
     * @param {boolean} [paranoid=true] - Si es true, incluye registros eliminados.
     * @returns {Promise<Object>} - La relación talla numerica encontrada.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }

}


export default GetByIdTallaNumeroProductoService;