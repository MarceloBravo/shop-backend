
import CreateTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/CreateTallaNumeroProductoService.js';
import validaDatos from '../../../../src/services/tallaNumeroProducto/validaDatos.js';

jest.mock('../../../../src/services/tallaNumeroProducto/validaDatos.js');

describe('CreateTallaNumeroProductoService', () => {
  let createTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
    };
    createTallaNumeroProductoService = new CreateTallaNumeroProductoService(mockRepository);
  });

  it('should create a new talla numero producto when data is valid', async () => {
    const data = { id_producto: 1, id_talla_numerica: 1, stock: 10 };
    const createdTallaNumeroProducto = { id: 1, ...data };

    validaDatos.mockResolvedValue();
    mockRepository.create.mockResolvedValue(createdTallaNumeroProducto);

    const result = await createTallaNumeroProductoService.execute(data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.create).toHaveBeenCalledWith(data, null);
    expect(result).toEqual(createdTallaNumeroProducto);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new CreateTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const data = { id_producto: 1, id_talla_numerica: 1, stock: 10 };
    const validationError = new Error('Validation failed');

    validaDatos.mockRejectedValue(validationError);

    await expect(createTallaNumeroProductoService.execute(data)).rejects.toThrow(validationError);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
