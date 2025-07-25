import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';


class GetPageAtributoProductoService{

    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository; 
    }   

    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
        try{
            const desde = (pag - 1) * limit;
            const result = await this.repository.getPage(desde, limit);
            return result;
        } catch (error) {
            throw new Error("Error al obtener la página con los atributos del producto: " + error.message);
        }
    }
}

export default GetPageAtributoProductoService;