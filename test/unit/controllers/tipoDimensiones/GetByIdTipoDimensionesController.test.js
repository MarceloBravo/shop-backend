import GetByIdTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/GetByIdTipoDimensionesController.js';
import GetByIdTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetByIdTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetByIdTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('GetByIdTipoDimensionesController', () => {
  let getByIdTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockGetByIdService;

  beforeEach(() => {
    jest.clearAllMocks()
    
    mockGetByIdService = new GetByIdTipoDimensionesService();
    mockGetByIdService.execute = jest.fn();
    GetByIdTipoDimensionesService.mockImplementation(() => mockGetByIdService);

    getByIdTipoDimensionesController = new GetByIdTipoDimensionesController();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should return a tipo dimensiones by ID', async () => {
    const tipoDimensiones = { id: 1, nombre: 'Test' };

    mockRequest.params.id = 1;
    mockGetByIdService.execute.mockResolvedValue(tipoDimensiones);

    await getByIdTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockGetByIdService.execute).toHaveBeenCalledWith(1);
    expect(mockResponse.json).toHaveBeenCalledWith(tipoDimensiones);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Not found');
    error.code = 404;

    mockRequest.params.id = 999;
    mockGetByIdService.execute.mockRejectedValue(error);

    await getByIdTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 404, message: 'Not found' });
  });

  it('should use default repository if none is provided', () => {
    const controller = new GetByIdTipoDimensionesController();
    expect(TipoDimensionesRepository).toHaveBeenCalledTimes(2); // Once in beforeEach, once here
    expect(controller.service).toBeInstanceOf(GetByIdTipoDimensionesService);
  });
});