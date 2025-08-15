
import CreateUsuarioController from '../../../../src/controllers/usuario/CreateUsuarioController.js';
import CreateUsuarioService from '../../../../src/services/usuario/CreateUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/CreateUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('CreateUsuarioController', () => {
  let createUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new CreateUsuarioService();
    mockServiceInstance.execute = jest.fn();
    CreateUsuarioService.mockImplementation(() => mockServiceInstance);

    createUsuarioController = new CreateUsuarioController();
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

  it('should use default repository if none is provided', () => {
    const controller = new CreateUsuarioController();
    expect(UsuarioRepository).toHaveBeenCalledTimes(2); // Once in beforeEach, once here
    expect(controller.service).toBeInstanceOf(CreateUsuarioService);
  });
});
