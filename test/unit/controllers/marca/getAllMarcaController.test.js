import GetAllMarcaController from '../../../../src/controllers/marca/GetAllMarcaController.js';

// Mock del modelo para evitar dependencias de Sequelize y variables de entorno
jest.mock('../../../../src/models/MarcaModel.js', () => ({
    MarcaModel: {
        findAndCountAll: jest.fn()
    } 
}));

// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};


describe('Unit Test: GetAllMarcaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllMarcaController(mockRepository);
    });

    it('Obtiene todos los marcas exitosamente', async () => {
        // Arrange
        const mockResponse = {
            data: [{
                "id": 38,
                "nombre": "Adidas",
                "logo": "path/to/logo-adidas.png",
                "createdAt": "2025-04-16T04:11:46.989Z",
                "updatedAt": "2025-04-16T04:11:46.989Z",
                "deletedAt": null
            },
            {
                "id": 3,
                "nombre": "Nike",
                "logo": "path/to/logo-nike.png",
                "createdAt": "2025-04-09T03:40:01.771Z",
                "updatedAt": "2025-04-17T00:01:22.189Z",
                "deletedAt": null
            },
            {
                "id": 5,
                "nombre": "Puma",
                "logo": "path/to/logo-puma.png",
                "createdAt": "2025-04-09T03:40:38.730Z",
                "updatedAt": "2025-04-09T03:40:38.730Z",
                "deletedAt": null
            }],
            count: 3
        };
        mockRepository.getAll.mockResolvedValue(mockResponse);

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute({}, res);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true); // El servicio llama getAll con paranoid=true por defecto
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
        mockRepository.getAll.mockRejectedValue(error);

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
});