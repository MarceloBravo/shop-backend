
import UpdateTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/UpdateTallaLetraProductoService.js';
import validaDatos from '../../../../src/services/tallaLetraProducto/validaDatos.js';

jest.mock('../../../../src/services/tallaLetraProducto/validaDatos.js');

describe('UpdateTallaLetraProductoService', () => {
  let updateTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
      update: jest.fn(),
    };
    updateTallaLetraProductoService = new UpdateTallaLetraProductoService(mockRepository);
  });

  it('should update a talla letra producto association when found and data is valid', async () => {
    const id = 1;
    const data = { stock: 15 };
    const existingTallaLetraProducto = { id: 1, id_producto: 1, id_talla_letra: 1, stock: 10 };
    const updatedTallaLetraProducto = { ...existingTallaLetraProducto, ...data };

    validaDatos.mockResolvedValue();
    mockRepository.getById.mockResolvedValue(existingTallaLetraProducto);
    mockRepository.update.mockResolvedValue(updatedTallaLetraProducto);

    const result = await updateTallaLetraProductoService.execute(id, data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.getById).toHaveBeenCalledWith(id);
    expect(mockRepository.update).toHaveBeenCalledWith(id, data, null);
    expect(result).toEqual(updatedTallaLetraProducto);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new UpdateTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });

  it('should throw an error if validation fails', async () => {
    const id = 1;
    const data = { stock: 15 };
    const validationError = new Error('Validation failed');

    validaDatos.mockRejectedValue(validationError);

    await expect(updateTallaLetraProductoService.execute(id, data)).rejects.toThrow(validationError);
    expect(mockRepository.getById).not.toHaveBeenCalled();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if talla letra producto association is not found', async () => {
    const id = 999;
    const data = { stock: 15 };

    validaDatos.mockResolvedValue();
    mockRepository.getById.mockResolvedValue(null);

    await expect(updateTallaLetraProductoService.execute(id, data)).rejects.toThrow('Asociación no encontrada');
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});
