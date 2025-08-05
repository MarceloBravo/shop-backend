// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn(),
    getBy: jest.fn() // Añadir mock para la comprobación de duplicados
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateMaterialesController from '../../../../src/controllers/materiales/UpdateMaterialController.js';

describe('Unit Test: UpdateMaterialesController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        // Por defecto, para los casos de éxito, simulamos que no hay duplicados.
        mockRepository.getBy.mockResolvedValue(null);
        controller = new UpdateMaterialesController(mockRepository);
    });

    it('Actualiza un materiales exitosamente', async () => {
        const id = 1;
        const materialesData = { valor: 'Goma' };
        const mockResponse = { material: { id, ...materialesData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: materialesData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);

        expect(mockRepository.update).toHaveBeenCalledWith(id, materialesData, null);
        expect(res.json).toHaveBeenCalledWith({
            material: mockResponse.material,
            mensaje: 'Material actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Crea un materiales si no existe', async () => {
        const id = 2;
        const materialesData = { valor: 'Lana' };
        const mockResponse = { material: { id, ...materialesData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        const req = {
            params: { id },
            body: materialesData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await controller.execute(req, res);
        expect(mockRepository.update).toHaveBeenCalledWith(id, materialesData, null);
        expect(res.json).toHaveBeenCalledWith({
            material: mockResponse.material,
            mensaje: 'Material creado exitosamente.'
        });
    });

    it('Maneja errores del repositorio correctamente', async () => {
        const id = 3;
        const materialesData = { valor: 'Cuero' };
        const req = {
            params: { id },
            body: materialesData
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

    it('Maneja errores de validación del servicio', async () => {
        const id = 4;
        const invalidData = { valor: '' }; // Datos inválidos
        const req = {
            params: { id },
            body: invalidData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Simulamos que el servicio (a través del repositorio) lanza un error de validación
        const validationError = new Error('Datos no válidos:');
        validationError.code = 400;
        mockRepository.update.mockRejectedValue(validationError);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 400,
            error: 'Error: Datos no válidos:'
        }));
    });
}); 