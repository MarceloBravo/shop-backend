// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllCategoriaWithDeletedController from '../../../../src/controllers/Categoria/GetAllCategoriaWithDeletedController.js';

describe('Unit Test: GetAllCategoriaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllCategoriaWithDeletedController(mockRepository);
    });

    it('Obtiene todos los categoriaes (incluyendo eliminados) exitosamente', async () => {
        const categoriaes = [
            {id: 1, nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1', deletedAt: null },
            {id: 2, nombre: 'Categoría 2', descripcion: 'Descriopción categoría 2', deletedAt: null },
            {id: 3, nombre: 'Categoría 3', descripcion: 'Descriopción categoría 3', deletedAt: '2025-01-01' },
        ];
        mockRepository.getAll.mockResolvedValue(categoriaes);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(categoriaes);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores del repositorio', async () => {
        const error = new Error('Error de base de datos');
        error.code = 500;
        mockRepository.getAll.mockRejectedValue(error);
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            error: expect.any(String)
        }));
    });
}); 