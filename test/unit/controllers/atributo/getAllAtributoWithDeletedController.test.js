// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllAtributoWithDeletedController from '../../../../src/controllers/atributo/GetAllAtributoWithDeletedController.js';

describe('Unit Test: GetAllAtributoWithDeletedController', () => {
    let controller;
    const atributos = [
            { id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 2, nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 3, nombre: 'Unidades', valor_string: null, valor_numerico: 3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: '2023-01-02' }
        ];

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllAtributoWithDeletedController(mockRepository);
    });

    it('Obtiene todos los atributos (incluyendo eliminados) exitosamente', async () => {
        mockRepository.getAll.mockResolvedValue(atributos);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);
        
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(atributos);
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