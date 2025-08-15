
import SoftDeleteUsuarioService from '../../../../src/services/usuario/SoftDeleteUsuarioService.js';

describe('SoftDeleteUsuarioService', () => {
  let softDeleteUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      softDelete: jest.fn(),
    };
    softDeleteUsuarioService = new SoftDeleteUsuarioService(mockRepository);
  });

  it('should soft delete a usuario when found', async () => {
    const usuario = { id: 1 };
    const deletedUsuario = { result: { id: 1, deleted_at: new Date() } };
    mockRepository.getById.mockResolvedValue(usuario);
    mockRepository.softDelete.mockResolvedValue(deletedUsuario);

    const result = await softDeleteUsuarioService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
    expect(mockRepository.softDelete).toHaveBeenCalledWith(1, undefined);
    expect(result).toEqual(deletedUsuario.result);
  });

  it('should throw an error if usuario is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(softDeleteUsuarioService.execute(999)).rejects.toThrow('El usuario no existe.');
    expect(mockRepository.softDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new SoftDeleteUsuarioService()).toThrow('Se requiere un repositorio para SoftDeleteUsuarioService.');
  });
});
