
import SoftDeleteUsuarioController from '../../../../src/controllers/usuario/SoftDeleteUsuarioController.js';
import SoftDeleteUsuarioService from '../../../../src/services/usuario/SoftDeleteUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/SoftDeleteUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('SoftDeleteUsuarioController', () => {
  let softDeleteUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new SoftDeleteUsuarioService();
    mockServiceInstance.execute = jest.fn();
    SoftDeleteUsuarioService.mockImplementation(() => mockServiceInstance);

    softDeleteUsuarioController = new SoftDeleteUsuarioController();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should soft delete a usuario and return success message', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue(true);

    await softDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      code: true,
      mensaje: 'El registro ha sido borrado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return error message if soft delete fails', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue(false);

    await softDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      code: false,
      mensaje: 'El registro no púdo ser borrado o registro inexistente',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.status = 404;

    mockRequest.params.id = 999;
    mockServiceInstance.execute.mockRejectedValue(error);

    await softDeleteUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, status: 404 });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new SoftDeleteUsuarioController()).toThrow('No se ha recibido un repositorio');
  });
});
