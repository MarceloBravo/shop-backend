import ColorRepository from '../../repositories/ColorRepository.js';

class SoftDeleteColorService{
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }       
}

export default SoftDeleteColorService;