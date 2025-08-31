
import HardDeleteUsuarioController from '../../../../src/controllers/usuario/HardDeleteUsuarioController.js';
import HardDeleteUsuarioService from '../../../../src/services/usuario/HardDeleteUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/HardDeleteUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('HardDeleteUsuarioController', () => {
  let hardDeleteUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new HardDeleteUsuarioService();
    mockServiceInstance.execute = jest.fn();
    HardDeleteUsuarioService.mockImplementation(() => mockServiceInstance);

    hardDeleteUsuarioController = new HardDeleteUsuarioController();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should hard delete a usuario and return success message', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue(true);

    await hardDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 200,
      mensaje: 'El registro ha sido eliminado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return error message if hard delete fails', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue(false);

    await hardDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 500,
      mensaje: 'El registro no púdo ser eliminado o registro inexistente',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.status = 404;

    mockRequest.params.id = 999;
    mockServiceInstance.execute.mockRejectedValue(error);

    await hardDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, status: 404 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new HardDeleteUsuarioController()).toThrow('No se ha recibido un repositorio');
  });

});
