
import HardDeleteTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/HardDeleteTallaNumeroProductoService.js';

describe('HardDeleteTallaNumeroProductoService', () => {
  let hardDeleteTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      hardDelete: jest.fn(),
    };
    hardDeleteTallaNumeroProductoService = new HardDeleteTallaNumeroProductoService(mockRepository);
  });

  it('should hard delete a talla numero producto association when found', async () => {
    const tallaNumeroProducto = { id: 1 };
    mockRepository.getById.mockResolvedValue(tallaNumeroProducto);
    mockRepository.hardDelete.mockResolvedValue(1);

    const result = await hardDeleteTallaNumeroProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
    expect(result).toBe(1);
  });

  it('should throw an error if talla numero producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(hardDeleteTallaNumeroProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.hardDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new HardDeleteTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });
});
