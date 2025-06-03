class GetAllColorService {  
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required');
        }
        this.repository = repository;
    }

    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}       

export default GetAllColorService;