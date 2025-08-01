// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAtributoWithDeletedController from '../../../../src/controllers/atributo/GetByIdAtributoWithDeletedController.js';

describe('Unit Test: GetAtributoWithDeletedController', () => {
    let controller;
    const atributo = { id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: '2023-01-02' };

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAtributoWithDeletedController(mockRepository);
    });

    it('Obtiene un atributo (incluyendo eliminados) exitosamente', async () => {
        const id = 1;
        mockRepository.getById.mockResolvedValue(atributo);

        const req = { params: { id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getById).toHaveBeenCalledWith(id, false);
        expect(res.json).toHaveBeenCalledWith(atributo);
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