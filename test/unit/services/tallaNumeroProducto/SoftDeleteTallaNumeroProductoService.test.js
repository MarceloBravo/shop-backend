
import SoftDeleteTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/SoftDeleteTallaNumeroProductoService.js';

describe('SoftDeleteTallaNumeroProductoService', () => {
  let softDeleteTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      softDelete: jest.fn(),
    };
    softDeleteTallaNumeroProductoService = new SoftDeleteTallaNumeroProductoService(mockRepository);
  });

  it('should soft delete a talla numero producto association when found', async () => {
    const tallaNumeroProducto = { id: 1 };
    const deletedTallaNumeroProducto = { id: 1, deleted_at: new Date() };
    mockRepository.getById.mockResolvedValue(tallaNumeroProducto);
    mockRepository.softDelete.mockResolvedValue(deletedTallaNumeroProducto);

    const result = await softDeleteTallaNumeroProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1);
    expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
    expect(result).toBe(true);
  });

  it('should throw an error if talla numero producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(softDeleteTallaNumeroProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.softDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new SoftDeleteTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });

  it('should return false if soft delete fails', async () => {
    const tallaNumeroProducto = { id: 1 };
    const notDeletedTallaNumeroProducto = { id: 1, deleted_at: null };
    mockRepository.getById.mockResolvedValue(tallaNumeroProducto);
    mockRepository.softDelete.mockResolvedValue(notDeletedTallaNumeroProducto);

    const result = await softDeleteTallaNumeroProductoService.execute(1);

    expect(result).toBe(false);
  });
});
