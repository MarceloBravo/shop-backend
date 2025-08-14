
import GetByIdTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetByIdTipoDimensionesService.js';

describe('GetByIdTipoDimensionesService', () => {
  let getByIdTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
    };
    getByIdTipoDimensionesService = new GetByIdTipoDimensionesService(mockRepository);
  });

  it('should return a tipo dimensiones when found', async () => {
    const tipoDimensiones = { id: 1, nombre: 'Test' };
    mockRepository.getById.mockResolvedValue(tipoDimensiones);

    const result = await getByIdTipoDimensionesService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
    expect(result).toEqual(tipoDimensiones);
  });

  it('should return a tipo dimensiones including soft deleted ones when paranoid is false', async () => {
    const tipoDimensiones = { id: 1, nombre: 'Test' };
    mockRepository.getById.mockResolvedValue(tipoDimensiones);

    const result = await getByIdTipoDimensionesService.execute(1, false);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(result).toEqual(tipoDimensiones);
  });

  it('should throw an error if tipo dimensiones is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(getByIdTipoDimensionesService.execute(999)).rejects.toThrow('Registro no encontrado');
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetByIdTipoDimensionesService()).toThrow('El repositorio es requerido');
  });
});
