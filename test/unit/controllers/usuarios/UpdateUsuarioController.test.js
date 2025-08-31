
import UpdateUsuarioController from '../../../../src/controllers/usuario/UpdateUsuarioController.js';
import UpdateUsuarioService from '../../../../src/services/usuario/UpdateUsuarioService.js';
//import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/UpdateUsuarioService.js');
//jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('UpdateUsuarioController', () => {
  let updateUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockUsuarioRepository;

  beforeAll(() => {
    mockServiceInstance = new UpdateUsuarioService();
    mockServiceInstance.execute = jest.fn();
    mockUsuarioRepository = {
      update: jest.fn(),
      findById: jest.fn(),      
    }
    UpdateUsuarioService.mockImplementation(() => mockServiceInstance);
    updateUsuarioController = new UpdateUsuarioController(mockUsuarioRepository);
    mockRequest = {
      params: {},
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });


  it('should update a usuario and return success message', async () => {
    const usuarioData = { nombre: 'Updated Test' };
    const updatedUsuario = { id: 1, ...usuarioData };
    const result = { data: updatedUsuario, created: false }

    mockRequest.params.id = 1;
    mockRequest.body = usuarioData;
    
    mockServiceInstance.execute.mockResolvedValue(result);
    
    await updateUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updatedUsuario,
      mensaje: 'Registro actualizado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
  
  it('should create a usuario and return success message if created', async () => {
    const usuarioData = { nombre: 'New Test' };
    const newUsuario = { id: 2, ...usuarioData };
    const result = { data: newUsuario, created: true };

    mockRequest.params.id = 2;
    mockRequest.body = usuarioData;

    mockServiceInstance.execute.mockResolvedValue(result);

    await updateUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: newUsuario,
      mensaje: 'Registro creado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
  
  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Validation failed');
    error.status = 400;

    mockRequest.params.id = 1;
    mockRequest.body = { nombre: '' };

    mockServiceInstance.execute.mockRejectedValue(error);

    await updateUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 400, status: 400 });
  });
  
  it('throw a error if none repository is provided', () => {
    expect(() => new UpdateUsuarioController()).toThrow('No se ha recibido un repositorio');
  });
});
