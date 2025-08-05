// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageMaterialesController from '../../../../src/controllers/materiales/GetPageMaterialController.js';

describe('Unit Test: GetPageMaterialesController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageMaterialesController(mockRepository);
    });

    it('Obtiene una página de materialess exitosamente', async () => {
        const pag = 1, limit = 2;
        const rows = [
            { id: 1, valor: 'Algodón' },
            { id: 2, valor: 'Cuero' }
        ];
        const count = 2, totPag = 1;
        mockRepository.getPage.mockResolvedValue({ rows, count, totPag });

        const req = { params: { pag, limit } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getPage).toHaveBeenCalledWith((pag - 1) * limit, limit, true);
        expect(res.json).toHaveBeenCalledWith({ data: { data: rows, totReg: count, rows: rows.length, pag, totPag } });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores del repositorio', async () => {
        const pag = 1, limit = 2;
        const error = new Error('Error de base de datos');
        error.code = 500;
        mockRepository.getPage.mockRejectedValue(error);
        const req = { params: { pag, limit } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            error: expect.any(String)
        }));
    });
}); 