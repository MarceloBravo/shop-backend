
import CreateTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/CreateTallaLetraProductoService.js';
import validaDatos from '../../../../src/services/tallaLetraProducto/validaDatos.js';

jest.mock('../../../../src/services/tallaLetraProducto/validaDatos.js');

describe('CreateTallaLetraProductoService', () => {
  let createTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
    };
    createTallaLetraProductoService = new CreateTallaLetraProductoService(mockRepository);
  });

  it('should create a new talla letra producto when data is valid', async () => {
    const data = { id_producto: 1, id_talla_letra: 1, stock: 10 };
    const createdTallaLetraProducto = { id: 1, ...data };

    validaDatos.mockResolvedValue();
    mockRepository.create.mockResolvedValue(createdTallaLetraProducto);

    const result = await createTallaLetraProductoService.execute(data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.create).toHaveBeenCalledWith(data, null);
    expect(result).toEqual(createdTallaLetraProducto);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new CreateTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const data = { id_producto: 1, id_talla_letra: 1, stock: 10 };
    const validationError = new Error('Validation failed');

    validaDatos.mockRejectedValue(validationError);

    await expect(createTallaLetraProductoService.execute(data)).rejects.toThrow(validationError);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
