import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';

/**
 * Servicio para obtener todas las talla numericas.
 * @class GetAllTallaNumeroProductoService
 * @constructor
 * @param {TallaNumeroProductoRepository} repository - Repositorio de tallanumericaProducto.
 * @description Esta clase se encarga de obtener todas las talla numericas de la base de datos.
 * */
class GetAllTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las asociaciones entre productos y tallas de numerica
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * @returns {Promise<Array<Object>>} Lista de todas las asociaciones encontradas
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllTallaNumeroProductoService;