
import GetByIdUsuarioWithDeletedController from '../../../../src/controllers/usuario/GetByIdUsuarioWithDeletedController.js';
import GetByIdUsuarioService from '../../../../src/services/usuario/GetByIdUsuarioService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/GetByIdUsuarioService.js');

describe('GetByIdUsuarioWithDeletedController', () => {
  let getByIdUsuarioWithDeletedController;
  let mockRequest;
  let mockResponse;
  let mockGetByIdService;
  let mockUsuarioRepository;

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetByIdService = new GetByIdUsuarioService();
    mockGetByIdService.execute = jest.fn();
    mockUsuarioRepository = {
      getById: jest.fn(),
    }
    GetByIdUsuarioService.mockImplementation(() => mockGetByIdService);

    getByIdUsuarioWithDeletedController = new GetByIdUsuarioWithDeletedController(mockUsuarioRepository);

    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should return a usuario by ID including deleted ones', async () => {
    const usuario = { id: 1, nombre: 'Test', deleted_at: new Date() };

    mockRequest.params.id = 1;
    mockGetByIdService.execute.mockResolvedValue(usuario);

    await getByIdUsuarioWithDeletedController.execute(mockRequest, mockResponse);

    expect(mockGetByIdService.execute).toHaveBeenCalledWith(1, false);
    expect(mockResponse.json).toHaveBeenCalledWith(usuario);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.status = 404;

    mockRequest.params.id = 999;
    mockGetByIdService.execute.mockRejectedValue(error);

    await getByIdUsuarioWithDeletedController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, status: 404 });
  });


  it('throw a error if none repository is provided', () => {
    expect(() => new GetByIdUsuarioWithDeletedController()).toThrow('No se ha recibido un repositorio');
  });

});
