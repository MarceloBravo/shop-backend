// Mock del repositorio antes de importar el conttallaLetraador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/TallaLetraRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllTallaLetraWithDeletedController from '../../../../src/controllers/tallaLetra/GetAllTallaLetraWithDeletedController.js';

describe('Unit Test: GetAllTallaLetraWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllTallaLetraWithDeletedController(mockRepository);
    });

    it('Obtiene todos los tallaLetraes (incluyendo eliminados) exitosamente', async () => {
        // Arrange
        const mockData = { data: [{ id: 1, valor: 'M' }], count: 1 };
        mockRepository.getAll.mockResolvedValue(mockData);
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith([["valor", "ASC"]], false);
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