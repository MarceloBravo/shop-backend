// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllGeneroWithDeletedController from '../../../../src/controllers/genero/GetAllGeneroWithDeletedController.js';

describe('Unit Test: GetAllGeneroWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllGeneroWithDeletedController(mockRepository);
    });

    it('Obtiene todos los generoes (incluyendo eliminados) exitosamente', async () => {
        const generos = {data:[
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Verde', valor: '#00FF00' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(generos);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(generos);
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