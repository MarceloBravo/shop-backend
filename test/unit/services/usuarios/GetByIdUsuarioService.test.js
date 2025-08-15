
import GetByIdUsuarioService from '../../../../src/services/usuario/GetByIdUsuarioService.js';

describe('GetByIdUsuarioService', () => {
  let getByIdUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
    };
    getByIdUsuarioService = new GetByIdUsuarioService(mockRepository);
  });

  it('should return a usuario when found', async () => {
    const usuario = { id: 1, nombre: 'Test' };
    mockRepository.getById.mockResolvedValue(usuario);

    const result = await getByIdUsuarioService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
    expect(result).toEqual(usuario);
  });

  it('should return a usuario including soft deleted ones when paranoid is false', async () => {
    const usuario = { id: 1, nombre: 'Test' };
    mockRepository.getById.mockResolvedValue(usuario);

    const result = await getByIdUsuarioService.execute(1, false);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(result).toEqual(usuario);
  });

  it('should throw an error if usuario is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(getByIdUsuarioService.execute(999)).rejects.toThrow('El usuario no existe.');
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetByIdUsuarioService()).toThrow('Se requiere un repositorio para GetByIdUsuarioService.');
  });
});
