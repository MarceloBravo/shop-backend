import GetAllTipoDimensionesWithDeletedController from '../../../../src/controllers/tipoDimensiones/GetAllTipoDimensionesWithDeletedController.js';
import GetAllTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('GetAllTipoDimensionesWithDeletedController', () => {
  let getAllTipoDimensionesWithDeletedController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks()

    mockServiceInstance = new GetAllTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    GetAllTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    getAllTipoDimensionesWithDeletedController = new GetAllTipoDimensionesWithDeletedController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should return all tipo dimensiones including deleted ones', async () => {
    const tipoDimensiones = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2', deleted_at: new Date() }];

    mockServiceInstance.execute.mockResolvedValue(tipoDimensiones);

    await getAllTipoDimensionesWithDeletedController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith(false);  // false para incluir eliminados
    expect(mockResponse.json).toHaveBeenCalledWith(tipoDimensiones);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.code = 500;

    mockServiceInstance.execute.mockRejectedValue(error);

    await getAllTipoDimensionesWithDeletedController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, message: 'Database error' });
  });

  it('should use default repository if none is provided', () => {
    const controller = new GetAllTipoDimensionesWithDeletedController();
    expect(TipoDimensionesRepository).toHaveBeenCalledTimes(2); // Once in beforeEach, once here
    expect(controller.service).toBeInstanceOf(GetAllTipoDimensionesService);
  });
});