// Mock del repositorio antes de importar el conttallaNumeroador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/TallaNumeroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllTallaNumeroController from '../../../../src/controllers/tallaNumero/GetAllTallaNumeroController.js';

describe('Unit Test: GetAllTallaNumeroController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllTallaNumeroController(mockRepository);
    });

    it('Obtiene todos los tallaNumeroes exitosamente', async () => {
        // Arrange
        const mockData = { data: [{ id: 1, valor: 42.5 }], count: 1 };
        mockRepository.getAll.mockResolvedValue(mockData);
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);
        // Assert
        expect(mockRepository.getAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockData);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockRepository.getAll.mockRejectedValue(error);

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            details: [],
            error: expect.any(String)
        }));
    });
}); 