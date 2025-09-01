
import GetAllUsuarioController from '../../../../src/controllers/usuario/GetAllUsuarioController.js';
import GetAllUsuarioService from '../../../../src/services/usuario/GetAllUsuarioService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/GetAllUsuarioService.js');

describe('GetAllUsuarioController', () => {
  let getAllUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockUsuarioRepository;


  beforeEach(() => {
    jest.clearAllMocks()
    
    mockServiceInstance = new GetAllUsuarioService();
    mockServiceInstance.execute = jest.fn();
    mockUsuarioRepository = {
      getAll: jest.fn(),
    }
    GetAllUsuarioService.mockImplementation(() => mockServiceInstance);

    getAllUsuarioController = new GetAllUsuarioController(mockUsuarioRepository);
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should return all usuarios', async () => {
    const usuarios = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];

    mockServiceInstance.execute.mockResolvedValue(usuarios);

    await getAllUsuarioController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith();
    expect(mockResponse.json).toHaveBeenCalledWith(usuarios);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.status = 500;

     mockServiceInstance.execute.mockRejectedValue(error);

    await getAllUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, status: 500 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new GetAllUsuarioController()).toThrow('No se ha recibido un repositorio');
  });

});
