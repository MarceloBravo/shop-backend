
import GetAllTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js';

describe('GetAllTipoDimensionesService', () => {
  let getAllTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
    };
    getAllTipoDimensionesService = new GetAllTipoDimensionesService(mockRepository);
  });

  it('should return all tipo dimensiones', async () => {
    const tipoDimensiones = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];
    mockRepository.getAll.mockResolvedValue(tipoDimensiones);

    const result = await getAllTipoDimensionesService.execute();

    expect(mockRepository.getAll).toHaveBeenCalledWith([['nombre', 'ASC']], true);
    expect(result).toEqual(tipoDimensiones);
  });

  it('should return all tipo dimensiones including soft deleted ones when paranoid is false', async () => {
    const tipoDimensiones = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];
    mockRepository.getAll.mockResolvedValue(tipoDimensiones);

    const result = await getAllTipoDimensionesService.execute(false);

    expect(mockRepository.getAll).toHaveBeenCalledWith([['nombre', 'ASC']], false);
    expect(result).toEqual(tipoDimensiones);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetAllTipoDimensionesService()).toThrow('El repositorio es requerido');
  });
});
