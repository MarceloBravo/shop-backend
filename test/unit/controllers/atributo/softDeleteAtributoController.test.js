// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteAtributoController from '../../../../src/controllers/atributo/SoftDeleteAtributoController.js';

describe('Unit Test: SoftDeleteAtributoController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new SoftDeleteAtributoController(mockRepository);
    });

    it('Borra lógicamente un atributo exitosamente', async () => {
        const id = 1;
        mockRepository.getById.mockResolvedValue({ id });
        mockRepository.softDelete.mockResolvedValue({ result: true });

        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getById).toHaveBeenCalledWith(id);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(id, null);
        expect(res.json).toHaveBeenCalledWith({ code: 200, mensaje: 'El registro ha sido borrado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error si el atributo no existe', async () => {
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
        mockRepository.getById.mockResolvedValue({ id });
        const error = new Error('Error de base de datos');
        error.code = 500;
        mockRepository.softDelete.mockRejectedValue(error);
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