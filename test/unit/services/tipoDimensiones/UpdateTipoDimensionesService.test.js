
import UpdateTipoDimensionesService from '../../../../src/services/tipoDimensiones/UpdateTipoDimensionesService.js';
import validaDatos from '../../../../src/services/tipoDimensiones/validaDatos.js';

jest.mock('../../../../src/services/tipoDimensiones/validaDatos.js');

describe('UpdateTipoDimensionesService', () => {
  let updateTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      update: jest.fn(),
    };
    updateTipoDimensionesService = new UpdateTipoDimensionesService(mockRepository);
  });

  it('should update a tipo dimensiones when data is valid', async () => {
    const id = 1;
    const data = { nombre: 'Updated Test', nombre_corto: 'UT' };
    const updatedTipoDimensiones = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.update.mockResolvedValue({ data: updatedTipoDimensiones, created: false });

    const result = await updateTipoDimensionesService.execute(id, data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.update).toHaveBeenCalledWith(id, data, null);
    expect(result).toEqual({ data: updatedTipoDimensiones, created: false });
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new UpdateTipoDimensionesService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const id = 1;
    const data = { nombre: 'Updated Test', nombre_corto: 'UT' };
    const validationError = new Error('Validation failed');
    validationError.code = 400;
    validationError.details = ['Error'];

    validaDatos.mockImplementation(() => {
      throw validationError;
    });

    await expect(updateTipoDimensionesService.execute(id, data)).rejects.toThrow(validationError);
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});
