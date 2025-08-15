
import UpdateUsuarioService from '../../../../src/services/usuario/UpdateUsuarioService.js';
import { validaDatos } from '../../../../src/services/usuario/validaDatos.js';

jest.mock('../../../../src/services/usuario/validaDatos.js');

describe('UpdateUsuarioService', () => {
  let updateUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      update: jest.fn(),
      getById: jest.fn(),
    };
    updateUsuarioService = new UpdateUsuarioService(mockRepository);
  });

  it('should update a usuario when data is valid', async () => {
    const id = 1;
    const data = { nombre: 'Updated Test' };
    const updatedUsuario = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.getById.mockResolvedValue({ id: 1 });
    mockRepository.update.mockResolvedValue(updatedUsuario);

    const result = await updateUsuarioService.execute(id, data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.getById).toHaveBeenCalledWith(id, true);
    expect(mockRepository.update).toHaveBeenCalledWith(id, data, null);
    expect(result).toEqual(updatedUsuario);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new UpdateUsuarioService()).toThrow('Se requiere un repositorio para UpdateUsuarioService.');
  });

  it('should throw an error if validation fails', async () => {
    const id = 1;
    const data = { nombre: 'Updated Test' };
    const validationError = new Error('Validation failed');
    validationError.status = 400;

    validaDatos.mockImplementation(() => {
      throw validationError;
    });

    await expect(updateUsuarioService.execute(id, data)).rejects.toThrow(validationError);
    expect(mockRepository.getById).not.toHaveBeenCalled();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if usuario does not exist', async () => {
    const id = 1;
    const data = { nombre: 'Updated Test' };

    validaDatos.mockReturnValue(data);
    mockRepository.getById.mockResolvedValue(null);

    await expect(updateUsuarioService.execute(id, data)).rejects.toThrow('El usuario no existe.');
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});
