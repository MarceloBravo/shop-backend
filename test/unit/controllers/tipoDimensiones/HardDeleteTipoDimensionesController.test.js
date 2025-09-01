import HardDeleteTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/HardDeleteTipoDimensionesController.js';
import HardDeleteTipoDimensionesService from '../../../../src/services/tipoDimensiones/HardDeleteTipoDimensionesService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/HardDeleteTipoDimensionesService.js');

describe('HardDeleteTipoDimensionesController', () => {
  let hardDeleteTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockTipoDimensionesRepository;

  beforeAll(() => {
    jest.clearAllMocks();
    mockServiceInstance = new HardDeleteTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    mockTipoDimensionesRepository = {
      softDelete: jest.fn(),
      getById: jest.fn(),
    }
    HardDeleteTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    hardDeleteTipoDimensionesController = new HardDeleteTipoDimensionesController(mockTipoDimensionesRepository);
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should hard delete a tipo dimensiones and return success message', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue({ result: true });

    await hardDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 200,
      mensaje: 'El registro ha sido eliminado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return error message if hard delete fails', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue({ result: false });

    await hardDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 500,
      mensaje: 'El registro no púdo ser eliminado o registro inexistente',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.code = 404;

    mockRequest.params.id = 999;
    mockServiceInstance.execute.mockRejectedValue(error);

    await hardDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, message: 'Not found' });
  });

  it('throw a error if none repository is provided', () => {
      expect(() => new HardDeleteTipoDimensionesController()).toThrow('No se ha recibido un repositorio');
  });
});