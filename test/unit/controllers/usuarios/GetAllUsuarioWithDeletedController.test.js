
import GetAllUsuarioWithDeletedController from '../../../../src/controllers/usuario/GetAllUsuarioWithDeletedController.js';
import GetAllUsuarioService from '../../../../src/services/usuario/GetAllUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/GetAllUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('GetAllUsuarioWithDeletedController', () => {
  let getAllUsuarioWithDeletedController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks()

    mockServiceInstance = new GetAllUsuarioService();
    mockServiceInstance.execute = jest.fn();
    GetAllUsuarioService.mockImplementation(() => mockServiceInstance);

    getAllUsuarioWithDeletedController = new GetAllUsuarioWithDeletedController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should return all usuarios including deleted ones', async () => {
    const usuarios = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2', deleted_at: new Date() }];

    mockServiceInstance.execute.mockResolvedValue(usuarios);

    await getAllUsuarioWithDeletedController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith(false);  // false para incluir eliminados
    expect(mockResponse.json).toHaveBeenCalledWith(usuarios);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.status = 500;

    mockServiceInstance.execute.mockRejectedValue(error);

    await getAllUsuarioWithDeletedController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, status: 500 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new GetAllUsuarioWithDeletedController()).toThrow('No se ha recibido un repositorio');
  });

});
