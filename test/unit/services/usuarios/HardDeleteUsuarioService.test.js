
import HardDeleteUsuarioService from '../../../../src/services/usuario/HardDeleteUsuarioService.js';

describe('HardDeleteUsuarioService', () => {
  let hardDeleteUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      hardDelete: jest.fn(),
    };
    hardDeleteUsuarioService = new HardDeleteUsuarioService(mockRepository);
  });

  it('should hard delete a usuario when found', async () => {
    const usuario = { id: 1 };
    mockRepository.getById.mockResolvedValue(usuario);
    mockRepository.hardDelete.mockResolvedValue(1);

    await hardDeleteUsuarioService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
  });

  it('should throw an error if usuario is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(hardDeleteUsuarioService.execute(999)).rejects.toThrow('El usuario no existe.');
    expect(mockRepository.hardDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new HardDeleteUsuarioService()).toThrow('Se requiere un repositorio para HardDeleteUsuarioService.');
  });
});
