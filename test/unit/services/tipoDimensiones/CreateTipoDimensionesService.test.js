
import CreateTipoDimensionesService from '../../../../src/services/tipoDimensiones/CreateTipoDimensionesService.js';
import validaDatos from '../../../../src/services/tipoDimensiones/validaDatos.js';

jest.mock('../../../../src/services/tipoDimensiones/validaDatos.js');

describe('CreateTipoDimensionesService', () => {
  let createTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      getBy: jest.fn(),
    };
    createTipoDimensionesService = new CreateTipoDimensionesService(mockRepository);
  });

  it('should create a new tipo dimensiones when data is valid and name does not exist', async () => {
    const data = { nombre: 'Test', nombre_corto: 'T' };
    const createdTipoDimensiones = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.getBy.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(createdTipoDimensiones);

    const result = await createTipoDimensionesService.execute(data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.getBy).toHaveBeenCalledWith('nombre', data.nombre);
    expect(mockRepository.create).toHaveBeenCalledWith(data, null);
    expect(result).toEqual(createdTipoDimensiones);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new CreateTipoDimensionesService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const data = { nombre: 'Test', nombre_corto: 'T' };
    const validationError = new Error('Validation failed');
    validationError.code = 400;
    validationError.details = ['Error'];

    validaDatos.mockImplementation(() => {
      throw validationError;
    });

    await expect(createTipoDimensionesService.execute(data)).rejects.toThrow(validationError);
    expect(mockRepository.getBy).not.toHaveBeenCalled();
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if tipo dimensiones with the same name already exists', async () => {
    const data = { nombre: 'Test', nombre_corto: 'T' };
    const existingTipoDimensiones = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.getBy.mockResolvedValue(existingTipoDimensiones);

    await expect(createTipoDimensionesService.execute(data)).rejects.toThrow('Ya existe un tipo de dimensión con ese nombre');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
