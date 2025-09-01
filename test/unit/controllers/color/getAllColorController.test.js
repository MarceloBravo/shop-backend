// Mock del modelo para evitar dependencias de Sequelize y variables de entorno
jest.mock('../../../../src/models/ColorModel.js', () => ({
    ColorModel: {
        findAndCountAll: jest.fn()
    }
}));



import GetAllColorController from '../../../../src/controllers/color/GetAllColorController.js';

describe('Unit Test: GetAllColorController', () => {
    let controller;
    let mockColorRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockColorRepository = {
            getAll: jest.fn()
        }
        controller = new GetAllColorController(mockColorRepository);
    });

    it('Obtiene todos los colores exitosamente', async () => {
        // Arrange
        const mockResponse = [{
                "id": 38,
                "nombre": "Café",
                "valor": "braun",
                "createdAt": "2025-04-16T04:11:46.989Z",
                "updatedAt": "2025-04-16T04:11:46.989Z",
                "deletedAt": null
            },
            {
                "id": 3,
                "nombre": "Gris 1",
                "valor": "gray 1",
                "createdAt": "2025-04-09T03:40:01.771Z",
                "updatedAt": "2025-04-17T00:01:22.189Z",
                "deletedAt": null
            },
            {
                "id": 5,
                "nombre": "Negro",
                "valor": "black",
                "createdAt": "2025-04-09T03:40:38.730Z",
                "updatedAt": "2025-04-09T03:40:38.730Z",
                "deletedAt": null
            }
        ];
        mockColorRepository.getAll.mockResolvedValue(mockResponse);

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute({}, res);

        // Assert
        expect(mockColorRepository.getAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores del servicio correctamente', async () => {
        // Arrange
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockColorRepository.getAll.mockRejectedValue(error);

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            details: [],
            error: expect.any(String)
        }));
    });


    it('throw a error if none repository is provided', () => {
        expect(() => new GetAllColorController()).toThrow('No se ha recibido un repositorio');
    });
});