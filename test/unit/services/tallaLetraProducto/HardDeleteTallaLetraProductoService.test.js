
import HardDeleteTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/HardDeleteTallaLetraProductoService.js';

describe('HardDeleteTallaLetraProductoService', () => {
  let hardDeleteTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      hardDelete: jest.fn(),
    };
    hardDeleteTallaLetraProductoService = new HardDeleteTallaLetraProductoService(mockRepository);
  });

  it('should hard delete a talla letra producto association when found', async () => {
    const tallaLetraProducto = { id: 1 };
    mockRepository.getById.mockResolvedValue(tallaLetraProducto);
    mockRepository.hardDelete.mockResolvedValue(1);

    const result = await hardDeleteTallaLetraProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
    expect(result).toBe(1);
  });

  it('should throw an error if talla letra producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(hardDeleteTallaLetraProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.hardDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new HardDeleteTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });
});
