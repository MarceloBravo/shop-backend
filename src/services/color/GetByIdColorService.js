class GetByIdColorService {
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required');
        }
        this.repository = repository;
    }

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}   

export default GetByIdColorService;