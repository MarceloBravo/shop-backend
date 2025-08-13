
import UpdateTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/UpdateTallaNumeroProductoService.js';
import validaDatos from '../../../../src/services/tallaNumeroProducto/validaDatos.js';

jest.mock('../../../../src/services/tallaNumeroProducto/validaDatos.js');

describe('UpdateTallaNumeroProductoService', () => {
  let updateTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      update: jest.fn(),
    };
    updateTallaNumeroProductoService = new UpdateTallaNumeroProductoService(mockRepository);
  });

  it('should update a talla numero producto association when found and data is valid', async () => {
    const id = 1;
    const data = { stock: 15 };
    const existingTallaNumeroProducto = { id: 1, id_producto: 1, id_talla_numerica: 1, stock: 10 };
    const updatedTallaNumeroProducto = { ...existingTallaNumeroProducto, ...data };

    validaDatos.mockResolvedValue();
    mockRepository.getById.mockResolvedValue(existingTallaNumeroProducto);
    mockRepository.update.mockResolvedValue(updatedTallaNumeroProducto);

    const result = await updateTallaNumeroProductoService.execute(id, data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.getById).toHaveBeenCalledWith(id);
    expect(mockRepository.update).toHaveBeenCalledWith(id, data, null);
    expect(result).toEqual(updatedTallaNumeroProducto);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new UpdateTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const id = 1;
    const data = { stock: 15 };
    const validationError = new Error('Validation failed');

    validaDatos.mockRejectedValue(validationError);

    await expect(updateTallaNumeroProductoService.execute(id, data)).rejects.toThrow(validationError);
    expect(mockRepository.getById).not.toHaveBeenCalled();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if talla numero producto association is not found', async () => {
    const id = 999;
    const data = { stock: 15 };

    validaDatos.mockResolvedValue();
    mockRepository.getById.mockResolvedValue(null);

    await expect(updateTallaNumeroProductoService.execute(id, data)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});
