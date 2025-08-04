// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageCategoriaWithDeletedController from '../../../../src/controllers/Categoria/GetPageCategoriaWithDeletedController.js';

describe('Unit Test: GetPageCategoriaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageCategoriaWithDeletedController(mockRepository);
    });

    it('Obtiene una página de categoriaes (incluyendo eliminados) exitosamente', async () => {
        const pag = 1, limit = 2;
        const rows = [
            {id: 1, nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' },
            {id: 2, nombre: 'Categoría 2', descripcion: 'Descriopción categoría 2' },
            {id: 3, nombre: 'Categoría 3', descripcion: 'Descriopción categoría 3' }
        ];
        const count = 2, totPag = 1;
        mockRepository.getPage.mockResolvedValue({ rows, count, totPag });

        const req = { params: { pag, limit } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockRepository.getPage).toHaveBeenCalledWith((pag - 1) * limit, limit, false);
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