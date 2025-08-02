// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetCategoriaController from '../../../../src/controllers/Categoria/GetByIdCategoriaController.js';

describe('Unit Test: GetCategoriaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetCategoriaController(mockRepository);
    });

    it('Obtiene un categoria exitosamente', async () => {
        const id = 1;
        const categoria = { id, nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' };
        mockRepository.getById.mockResolvedValue(categoria);

        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getById).toHaveBeenCalledWith(id, true);
        expect(res.json).toHaveBeenCalledWith(categoria);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error si el categoria no existe', async () => {
        const id = 2;
        mockRepository.getById.mockResolvedValue(null);
        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 404,
            error: expect.any(String)
        }));
    });

    it('Maneja errores del repositorio', async () => {
        const id = 3;
        const error = new Error('Error de base de datos');
        error.code = 500;
        mockRepository.getById.mockRejectedValue(error);
        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            error: expect.any(String)
        }));
    });
}); 