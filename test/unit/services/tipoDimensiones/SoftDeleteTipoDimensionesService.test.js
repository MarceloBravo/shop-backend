
import SoftDeleteTipoDimensionesService from '../../../../src/services/tipoDimensiones/SoftDeleteTipoDimensionesService.js';

describe('SoftDeleteTipoDimensionesService', () => {
  let softDeleteTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      softDelete: jest.fn(),
    };
    softDeleteTipoDimensionesService = new SoftDeleteTipoDimensionesService(mockRepository);
  });

  it('should soft delete a tipo dimensiones when found', async () => {
    const tipoDimensiones = { id: 1 };
    const deletedTipoDimensiones = { id: 1, deleted_at: new Date() };
    mockRepository.getById.mockResolvedValue(tipoDimensiones);
    mockRepository.softDelete.mockResolvedValue(deletedTipoDimensiones);

    const result = await softDeleteTipoDimensionesService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1);
    expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
    expect(result).toEqual(deletedTipoDimensiones);
  });

  it('should throw an error if tipo dimensiones is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(softDeleteTipoDimensionesService.execute(999)).rejects.toThrow('Registro no encontrado');
    expect(mockRepository.softDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new SoftDeleteTipoDimensionesService()).toThrow('El repositorio es requerido');
  });
});
