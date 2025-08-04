// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateGeneroController from '../../../../src/controllers/genero/UpdateGeneroController.js';

describe('Unit Test: UpdateGeneroController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateGeneroController(mockRepository);
    });

    it('Actualiza un genero exitosamente', async () => {
        const id = 1;
        const generoData = { genero: 'Femenino' };
        const mockResponse = { data: { id, ...generoData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: generoData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(mockRepository.update).toHaveBeenCalledWith(id, generoData);
        expect(res.json).toHaveBeenCalledWith({
            genero: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un genero si no existe', async () => {
        const id = 2;
        const generoData = { genero: 'Femenino' };
        const mockResponse = { data: { id, ...generoData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: generoData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(res.json).toHaveBeenCalledWith({
            genero: mockResponse.data,
            mensaje: 'Registro creado exitosamente.'
        });
    });

    it('Maneja errores correctamente', async () => {
        const id = 3;
        const generoData = { genero: 'Masculino' };
        const req = {
            params: { id },
            body: generoData
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