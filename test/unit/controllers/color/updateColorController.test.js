// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateColorController from '../../../../src/controllers/color/UpdateColorController.js';

describe('Unit Test: UpdateColorController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateColorController(mockRepository);
    });

    it('Actualiza un color exitosamente', async () => {
        const id = 1;
        const colorData = { nombre: 'Azul', valor: '#0000FF' };
        const mockResponse = { data: { id, ...colorData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: colorData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(mockRepository.update).toHaveBeenCalledWith(id, colorData);
        expect(res.json).toHaveBeenCalledWith({
            color: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un color si no existe', async () => {
        const id = 2;
        const colorData = { nombre: 'Verde', valor: '#00FF00' };
        const mockResponse = { data: { id, ...colorData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: colorData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(res.json).toHaveBeenCalledWith({
            color: mockResponse.data,
            mensaje: 'Registro creado exitosamente.'
        });
    });

    it('Maneja errores correctamente', async () => {
        const id = 3;
        const colorData = { nombre: 'Rojo', valor: '#FF0000' };
        const req = {
            params: { id },
            body: colorData
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