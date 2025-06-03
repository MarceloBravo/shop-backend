class HardDeleteColorService {
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required');
        }
        this.repository = repository;
    }

    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}   

export default HardDeleteColorService;