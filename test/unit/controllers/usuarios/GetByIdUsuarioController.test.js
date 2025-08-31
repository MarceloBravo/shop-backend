
import GetByIdUsuarioController from '../../../../src/controllers/usuario/GetByIdUsuarioController.js';
import GetByIdUsuarioService from '../../../../src/services/usuario/GetByIdUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/GetByIdUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('GetByIdUsuarioController', () => {
  let getByIdUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockGetByIdService;

  beforeEach(() => {
    jest.clearAllMocks()
    
    mockGetByIdService = new GetByIdUsuarioService();
    mockGetByIdService.execute = jest.fn();
    GetByIdUsuarioService.mockImplementation(() => mockGetByIdService);

    getByIdUsuarioController = new GetByIdUsuarioController();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should return a usuario by ID', async () => {
    const usuario = { id: 1, nombre: 'Test' };

    mockRequest.params.id = 1;
    mockGetByIdService.execute.mockResolvedValue(usuario);

    await getByIdUsuarioController.execute(mockRequest, mockResponse);

    expect(mockGetByIdService.execute).toHaveBeenCalledWith(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: usuario });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return a 404 message if usuario not found', async () => {
    mockRequest.params.id = 1;
    mockGetByIdService.execute.mockResolvedValue(null);

    await getByIdUsuarioController.execute(mockRequest, mockResponse);

    expect(mockGetByIdService.execute).toHaveBeenCalledWith(1);
    expect(mockResponse.json).toHaveBeenCalledWith({code: 404, mensaje: 'El registro no existe.' });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.status = 404;

    mockRequest.params.id = 999;
    mockGetByIdService.execute.mockRejectedValue(error);

    await getByIdUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, status: 404 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new GetByIdUsuarioController()).toThrow('No se ha recibido un repositorio');
  });

});
