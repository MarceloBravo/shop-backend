import GetAllTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/GetAllTipoDimensionesController.js';
import GetAllTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('GetAllTipoDimensionesController', () => {
  let getAllTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;


  beforeEach(() => {
    jest.clearAllMocks()
    
    mockServiceInstance = new GetAllTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    GetAllTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    getAllTipoDimensionesController = new GetAllTipoDimensionesController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should return all tipo dimensiones', async () => {
    const tipoDimensiones = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];

    mockServiceInstance.execute.mockResolvedValue(tipoDimensiones);

    await getAllTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith();
    expect(mockResponse.json).toHaveBeenCalledWith(tipoDimensiones);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.code = 500;

     mockServiceInstance.execute.mockRejectedValue(error);

    await getAllTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, message: 'Database error' });
  });

  it('should use default repository if none is provided', () => {
    const controller = new GetAllTipoDimensionesController();
    expect(TipoDimensionesRepository).toHaveBeenCalledTimes(2); // Once in beforeEach, once here
    expect(controller.service).toBeInstanceOf(GetAllTipoDimensionesService);
  });
});