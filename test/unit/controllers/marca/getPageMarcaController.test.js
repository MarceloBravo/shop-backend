// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageMarcaController from '../../../../src/controllers/marca/GetPageMarcaController.js';

describe('Unit Test: GetPageMarcaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageMarcaController(mockRepository);
    });

    it('Obtiene una página de marcas exitosamente', async () => {
        const pag = 1, limit = 2;
        const rows = [
            { id: 1, nombre: 'Adidas', logo: 'path/to/logo-adidas.png' },
            { id: 2, nombre: 'Nike', logo: 'path/to/logo-nike.png' }
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