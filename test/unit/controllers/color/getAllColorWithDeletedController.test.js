// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllColorWithDeletedController from '../../../../src/controllers/color/GetAllColorWithDeletedController.js';

describe('Unit Test: GetAllColorWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllColorWithDeletedController(mockRepository);
    });

    it('Obtiene todos los colores (incluyendo eliminados) exitosamente', async () => {
        const colores = [
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Verde', valor: '#00FF00' }
        ];
        mockRepository.getAll.mockResolvedValue(colores);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(colores);
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