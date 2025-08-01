// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageAtributoController from '../../../../src/controllers/atributo/GetPageAtributoController.js';

describe('Unit Test: GetPageAtributoController', () => {
    let controller;
    const rows = [
            { id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 2, nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 3, nombre: 'Unidades', valor_string: null, valor_numerico: 3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: '2023-01-02' }
        ];

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageAtributoController(mockRepository);
    });

    it('Obtiene una página de atributoes exitosamente', async () => {
        const pag = 1, limit = 2;
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