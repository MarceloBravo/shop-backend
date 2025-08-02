// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllCategoriaService from '../../../../src/services/Categoria/GetAllCategoriaService.js';

describe('Unit Test: GetAllCategoriaService', () => {
    let service;
    const mockCategorias = [
            {id: 1, nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' },
            {id: 2, nombre: 'Vestuario', descripcion: 'Vestuario hombre, mujer y niño' }
        ];

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllCategoriaService(mockRepository);
    });

    it('Obtiene todos los categoriaes exitosamente', async () => {
        // Arrange
        
        mockRepository.getAll.mockResolvedValue(mockCategorias);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockCategorias);
    });

    it('Obtiene todos los categoriaes incluyendo eliminados', async () => {
        // Arrange
        mockCategorias[1].deletedAt = '2023-01-01';
        mockRepository.getAll.mockResolvedValue(mockCategorias);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockCategorias);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllCategoriaService()).toThrow('El repositorio es requerido');
    });
    
}); 