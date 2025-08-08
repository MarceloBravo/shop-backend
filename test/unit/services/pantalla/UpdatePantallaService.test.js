import UpdatePantallaService from '../../../../src/services/pantalla/UpdatePantallaService.js';

const mockRepository = {
    update: jest.fn(),
    getBy: jest.fn(),
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/PantallaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});


describe('UpdatePantallaService', () => {
    let service;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new UpdatePantallaService(mockRepository);
    });

    test('debería actualizar un pantalla correctamente', async () => {
        const pantallaId = 1;
        const data = { nombre: 'ADMIN', uri: 'admin' };
        const mockPantalla = { id: 1, nombre: 'Pantalla Valida', uri: 'uri' };
        const mockUpdatedPantalla = { id: pantallaId, ...data };

        // Configurar los mocks para que las validaciones pasen
        mockRepository.getById.mockResolvedValue(mockPantalla);
        mockRepository.update.mockResolvedValue(mockUpdatedPantalla);

        const result = await service.execute(pantallaId, data);

        expect(result).toEqual(mockUpdatedPantalla);
        expect(mockRepository.getById).toHaveBeenCalledWith(pantallaId);
        expect(mockRepository.update).toHaveBeenCalledWith(pantallaId, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '', uri: null };
        await expect(service.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdatePantallaService()).toThrow('El repositorio es requerido');
    });

    test('debería lanzar error si la pantalla no existe', async () => {
        const pantallaId = 1;
        const data = { nombre: 'Pantalla Inexistente', uri: 'inexistente' };

        // Configurar el mock para que no encuentre la pantalla
        mockRepository.getById.mockResolvedValue(null);

        await expect(service.execute(pantallaId, data)).rejects.toThrow('Pantalla no encontrada');
        expect(mockRepository.update).not.toHaveBeenCalled();
    }   );
});
