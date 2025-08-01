// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateAtributoController from '../../../../src/controllers/atributo/UpdateAtributoController.js';

describe('Unit Test: UpdateAtributoController', () => {
    let controller;
    const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateAtributoController(mockRepository);
    });

    it('Actualiza un atributo exitosamente', async () => {
        const id = 1;
        const mockResponse = { data: { id, ...atributoData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: atributoData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(mockRepository.update).toHaveBeenCalledWith(id, atributoData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un atributo si no existe', async () => {
        const id = 2;
        const mockResponse = { data: { id, ...atributoData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: atributoData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse.data,
            mensaje: 'Registro creado exitosamente.'
        });
    });

    it('Maneja errores correctamente', async () => {
        const id = 3;
        const req = {
            params: { id },
            body: atributoData
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