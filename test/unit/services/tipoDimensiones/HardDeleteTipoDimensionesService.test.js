
import HardDeleteTipoDimensionesService from '../../../../src/services/tipoDimensiones/HardDeleteTipoDimensionesService.js';

describe('HardDeleteTipoDimensionesService', () => {
  let hardDeleteTipoDimensionesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      hardDelete: jest.fn(),
    };
    hardDeleteTipoDimensionesService = new HardDeleteTipoDimensionesService(mockRepository);
  });

  it('should hard delete a tipo dimensiones when found', async () => {
    const tipoDimensiones = { id: 1 };
    mockRepository.getById.mockResolvedValue(tipoDimensiones);
    mockRepository.hardDelete.mockResolvedValue(1);

    const result = await hardDeleteTipoDimensionesService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
    expect(result).toBe(1);
  });

  it('should throw an error if tipo dimensiones is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(hardDeleteTipoDimensionesService.execute(999)).rejects.toThrow('Regístro no encontrado');
    expect(mockRepository.hardDelete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new HardDeleteTipoDimensionesService()).toThrow('El repositorio es requerido');
  });
});
