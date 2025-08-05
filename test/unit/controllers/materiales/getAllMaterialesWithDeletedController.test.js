// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllMaterialesWithDeletedController from '../../../../src/controllers/materiales/GetAllMaterialWithDeletedController.js';

describe('Unit Test: GetAllMaterialesWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllMaterialesWithDeletedController(mockRepository);
    });

    it('Obtiene todos los materialeses (incluyendo eliminados) exitosamente', async () => {
        const materialess = {data:[
            {id: 1, valor: 'Algodón' },
            {id: 2, valor: 'Cuero' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(materialess);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(materialess);
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