import UpdateTallaLetraService from '../../../../src/services/tallaLetra/UpdateTallaLetraService.js';

describe('UpdateTallaLetraService', () => {
    const mockTallaLetraRepository = {
        update: jest.fn()
    };
    let updateTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        updateTallaLetraService = new UpdateTallaLetraService(mockTallaLetraRepository);
    });

    test('debería actualizar un tallaLetra correctamente', async () => {
        const data = { valor: 'M' };
        const mockTallaLetra = { id: 1, valor: 'M' };
        mockTallaLetraRepository.update.mockResolvedValue(mockTallaLetra);

        const result = await updateTallaLetraService.execute(1, data);

        expect(result).toEqual(mockTallaLetra);
        expect(mockTallaLetraRepository.update).toHaveBeenCalledWith(1, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { valor: '' };
        await expect(updateTallaLetraService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockTallaLetraRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 