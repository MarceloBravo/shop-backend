// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateMarcaController from '../../../../src/controllers/marca/UpdateMarcaController.js';

describe('Unit Test: UpdateMarcaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateMarcaController(mockRepository);
    });

    it('Actualiza un marca exitosamente', async () => {
        const id = 1;
        const marcaData = { nombre: 'Adidas', logo: 'path/to/logo.png' };
        const mockResponse = { data: { id, ...marcaData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: marcaData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(mockRepository.update).toHaveBeenCalledWith(id, marcaData, null);
        expect(res.json).toHaveBeenCalledWith({
            marca: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un marca si no existe', async () => {
        const id = 2;
        const marcaData = { nombre: 'nike', logo: 'path/to/logo-nike.png'};
        const mockResponse = { data: { id, ...marcaData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: marcaData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(res.json).toHaveBeenCalledWith({
            marca: mockResponse.data,
            mensaje: 'Registro creado exitosamente.'
        });
    });

    it('Maneja errores correctamente', async () => {
        const id = 3;
        const marcaData = { nombre: 'Masculino', logo: 'path/to/logo.png' };
        const req = {
            params: { id },
            body: marcaData
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