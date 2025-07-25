// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetColorController from '../../../../src/controllers/color/GetColorController.js';

describe('Unit Test: GetColorController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetColorController(mockRepository);
    });

    it('Obtiene un color exitosamente', async () => {
        const id = 1;
        const color = { id, nombre: 'Rojo', valor: '#FF0000' };
        mockRepository.getById.mockResolvedValue(color);

        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getById).toHaveBeenCalledWith(id, true);
        expect(res.json).toHaveBeenCalledWith(color);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error si el color no existe', async () => {
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