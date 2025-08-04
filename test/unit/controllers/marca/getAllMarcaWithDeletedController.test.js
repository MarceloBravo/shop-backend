// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllMarcaWithDeletedController from '../../../../src/controllers/marca/GetAllMarcaWithDeletedController.js';

describe('Unit Test: GetAllMarcaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllMarcaWithDeletedController(mockRepository);
    });

    it('Obtiene todos los marcaes (incluyendo eliminados) exitosamente', async () => {
        const marcas = {data:[
            {id: 1, nombre: 'Adidas', logo:'path/to/logo-adidas.png' },
            {id: 2, nombre: 'Nike', logo:'path/to/logo-nike.png' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(marcas);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(marcas);
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