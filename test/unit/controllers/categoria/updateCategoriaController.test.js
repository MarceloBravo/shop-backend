// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateCategoriaController from '../../../../src/controllers/Categoria/UpdateCategoriaController.js';

describe('Unit Test: UpdateCategoriaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateCategoriaController(mockRepository);
    });

    it('Actualiza un categoria exitosamente', async () => {
        const id = 1;
        const categoriaData = { id, nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' };
        const mockResponse = { data: { id, ...categoriaData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: categoriaData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);
        expect(mockRepository.update).toHaveBeenCalledWith(id, categoriaData);
        expect(res.json).toHaveBeenCalledWith(
            {
                data: mockResponse.data,
                mensaje: 'Registro actualizado exitosamente.'
            }
        );
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un categoria si no existe', async () => {
        const id = 2;
        const categoriaData = { nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' };
        const mockResponse = { data: { id, ...categoriaData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: categoriaData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(res.json).toHaveBeenCalledWith(
            {
                data: mockResponse.data,
                mensaje: 'Registro creado exitosamente.'
            }
        );
    });

    it('Maneja errores correctamente', async () => {
        const id = 3;
        const categoriaData = { nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' };
        const req = {
            params: { id },
            body: categoriaData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        error.code = 500;
        mockRepository.update.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            error: expect.any(String)
        }));
    });
}); 