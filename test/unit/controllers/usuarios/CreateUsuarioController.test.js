
import CreateUsuarioController from '../../../../src/controllers/usuario/CreateUsuarioController.js';
import CreateUsuarioService from '../../../../src/services/usuario/CreateUsuarioService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/CreateUsuarioService.js');

describe('CreateUsuarioController', () => {
  let createUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockUsuarioRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new CreateUsuarioService();
    mockServiceInstance.execute = jest.fn();
    mockUsuarioRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      getBy: jest.fn()
    }
    CreateUsuarioService.mockImplementation(() => mockServiceInstance);

    createUsuarioController = new CreateUsuarioController(mockUsuarioRepository);
    mockRequest = {
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should create a new usuario and return success message', async () => {
    const usuarioData = { nombre: 'Test', rut: '12345678-9' };
    const createdUsuario = { id: 1, ...usuarioData };

    mockRequest.body = usuarioData;
    mockServiceInstance.execute.mockResolvedValue(createdUsuario);

    await createUsuarioController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith(usuarioData);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createdUsuario,
      mensaje: 'El registro ha sido creado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Validation failed');
    error.status = 400;

    mockRequest.body = { nombre: '', rut: '' };
    mockServiceInstance.execute.mockRejectedValue(error);

    await createUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 400, status: 400 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new CreateUsuarioController()).toThrow('No se ha recibido un repositorio');
  });

});
