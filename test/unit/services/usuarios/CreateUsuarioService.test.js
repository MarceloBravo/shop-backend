
import CreateUsuarioService from '../../../../src/services/usuario/CreateUsuarioService.js';
import { validaDatos } from '../../../../src/services/usuario/validaDatos.js';

jest.mock('../../../../src/services/usuario/validaDatos.js');

describe('CreateUsuarioService', () => {
  let createUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      getBy: jest.fn(),
    };
    createUsuarioService = new CreateUsuarioService(mockRepository);
  });

  it('should create a new usuario when data is valid and rut does not exist', async () => {
    const data = { nombre: 'Test', rut: '12345678-9' };
    const createdUsuario = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.getBy.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(createdUsuario);

    const result = await createUsuarioService.execute(data);

    expect(validaDatos).toHaveBeenCalledWith(data);
    expect(mockRepository.getBy).toHaveBeenCalledWith('rut', data.rut);
    expect(mockRepository.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(createdUsuario);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new CreateUsuarioService()).toThrow('Se requiere un repositorio para CreateUsuarioService.');
  });

  it('should throw an error if validation fails', async () => {
    const data = { nombre: 'Test', rut: '12345678-9' };
    const validationError = new Error('Validation failed');
    validationError.status = 400;

    validaDatos.mockImplementation(() => {
      throw validationError;
    });

    await expect(createUsuarioService.execute(data)).rejects.toThrow(validationError);
    expect(mockRepository.getBy).not.toHaveBeenCalled();
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if usuario with the same rut already exists', async () => {
    const data = { nombre: 'Test', rut: '12345678-9' };
    const existingUsuario = { id: 1, ...data };

    validaDatos.mockReturnValue(data);
    mockRepository.getBy.mockResolvedValue(existingUsuario);

    await expect(createUsuarioService.execute(data)).rejects.toThrow('El usuario ya está exíste.');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
