// Mock del repositorio antes de importar el conttallaNumeroador
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/TallaNumeroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageTallaNumeroWithDeletedController from '../../../../src/controllers/tallaNumero/GetPageTallaNumeroWithDeletedController.js';

describe('Unit Test: GetPageTallaNumeroWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageTallaNumeroWithDeletedController(mockRepository);
    });

    it('Obtiene una página de tallaNumeroes (incluyendo eliminados) exitosamente', async () => {
        // Arrange
        const mockRows = [{ id: 1, valor: 42.5 }];
        const mockCount = 1;
        const mockTotPag = 1;
        mockRepository.getPage.mockResolvedValue({ rows: mockRows, count: mockCount, totPag: mockTotPag });
        const req = { params: { pag: 1, limit: 10 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, [["valor", "ASC"]], false);
        expect(res.json).toHaveBeenCalledWith({ data: { data: mockRows, totReg: mockCount, rows: mockRows.length, pag: 1, totPag: mockTotPag } });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const req = { params: { pag: 1, limit: 10 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        mockRepository.getPage.mockRejectedValue(new Error('Error de base de datos'));

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