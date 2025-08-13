
import SoftDeleteTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/SoftDeleteTallaLetraProductoService.js';

describe('SoftDeleteTallaLetraProductoService', () => {
  let softDeleteTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      softDelete: jest.fn(),
    };
    softDeleteTallaLetraProductoService = new SoftDeleteTallaLetraProductoService(mockRepository);
  });

  it('should soft delete a talla letra producto association when found', async () => {
    const tallaLetraProducto = { id: 1 };
    const deletedTallaLetraProducto = { id: 1, deleted_at: new Date() };
    mockRepository.getById.mockResolvedValue(tallaLetraProducto);
    mockRepository.softDelete.mockResolvedValue(deletedTallaLetraProducto);

    const result = await softDeleteTallaLetraProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1);
    expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
    expect(result).toBe(true);
  });

  it('should throw an error if talla letra producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(softDeleteTallaLetraProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.softDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new SoftDeleteTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });

  it('should return false if soft delete fails', async () => {
    const tallaLetraProducto = { id: 1 };
    const notDeletedTallaLetraProducto = { id: 1, deleted_at: null };
    mockRepository.getById.mockResolvedValue(tallaLetraProducto);
    mockRepository.softDelete.mockResolvedValue(notDeletedTallaLetraProducto);

    const result = await softDeleteTallaLetraProductoService.execute(1);

    expect(result).toBe(false);
  });
});
