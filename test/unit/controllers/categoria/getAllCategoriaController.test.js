// Mock del modelo para evitar dependencias de Sequelize y variables de entorno
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});
import GetAllCategoriaController from '../../../../src/controllers/Categoria/GetAllCategoriaController.js';

describe('Unit Test: GetAllCategoriaController', () => {
    let controller;
    const mockResponse = [
        { nombre: 'Categoría 1', descripcion: 'Descriopción categoría 1' },
        { nombre: 'Categoría 2', descripcion: 'Descriopción categoría 2' },
        { nombre: 'Categoría 3', descripcion: 'Descriopción categoría 3' }
    ];

    beforeEach(() => {
        
        jest.clearAllMocks();
        controller = new GetAllCategoriaController(mockRepository);
    });

    it('Obtienen todos las categorias exitosamente', async () => {
        mockRepository.getAll.mockResolvedValue(mockResponse);
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
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
        error.code = 500;
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