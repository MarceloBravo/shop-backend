import SoftDeleteTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/SoftDeleteTipoDimensionesController.js';
import SoftDeleteTipoDimensionesService from '../../../../src/services/tipoDimensiones/SoftDeleteTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/SoftDeleteTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('SoftDeleteTipoDimensionesController', () => {
  let softDeleteTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new SoftDeleteTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    SoftDeleteTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    softDeleteTipoDimensionesController = new SoftDeleteTipoDimensionesController();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should soft delete a tipo dimensiones and return success message', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue({id: mockRequest.params.id, result: true});

    await softDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 200,
      mensaje: 'El registro ha sido borrado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should return error message if soft delete fails', async () => {
    mockRequest.params.id = 1;
    mockServiceInstance.execute.mockResolvedValue({id: mockRequest.params.id, result: false});

    await softDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      code: 500,
      mensaje: 'El registro no púdo ser borrado o registro inexistente',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.code = 404;

    mockRequest.params.id = 999;
    mockServiceInstance.execute.mockRejectedValue(error);

    await softDeleteTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, message: 'Not found' });
  });

  it('should use default repository if none is provided', () => {
    const controller = new SoftDeleteTipoDimensionesController();
    expect(TipoDimensionesRepository).toHaveBeenCalledTimes(2); // Once in beforeEach, once here
    expect(controller.service).toBeInstanceOf(SoftDeleteTipoDimensionesService);
  });
});