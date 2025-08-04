// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetMarcaWithDeletedController from '../../../../src/controllers/marca/GetByIdMarcaWithDeletedController.js';

describe('Unit Test: GetMarcaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetMarcaWithDeletedController(mockRepository);
    });

    it('Obtiene un marca (incluyendo eliminados) exitosamente', async () => {
        const id = 1;
        const marca = { id, nombre: 'Rojo', logo: 'parh/to/logo.png' };
        mockRepository.getById.mockResolvedValue(marca);

        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getById).toHaveBeenCalledWith(id, false);
        expect(res.json).toHaveBeenCalledWith(marca);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error si el marca no existe', async () => {
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