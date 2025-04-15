export default class CRUDInterface {

    constructor(){
        if(new.target === CRUDInterface){
            throw new Error('CRUDInterface es una interface y no se puede instanciar.')
        }

        if(!this.buscar){
            throw new Error('Debe implementar el método buscar().')
        }

        if(!this.listarTodos){
            throw new Error('Debe implementar el método listarTodos().')
        }
    }

    listarTodos(){
        throw new Error('Debe implementar el método listarTodos().')
    }
}