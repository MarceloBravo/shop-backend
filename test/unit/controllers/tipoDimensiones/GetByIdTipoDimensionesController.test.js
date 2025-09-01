import GetByIdTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/GetByIdTipoDimensionesController.js';
import GetByIdTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetByIdTipoDimensionesService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetByIdTipoDimensionesService.js');

describe('GetByIdTipoDimensionesController', () => {
  let getByIdTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockGetByIdService;
  let mockTipoDimensionesRepository;

  beforeEach(() => {
    jest.clearAllMocks()
    
    mockGetByIdService = new GetByIdTipoDimensionesService();
    mockGetByIdService.execute = jest.fn();
    mockTipoDimensionesRepository = {
      getById: jest.fn(),
    }
    GetByIdTipoDimensionesService.mockImplementation(() => mockGetByIdService);

    getByIdTipoDimensionesController = new GetByIdTipoDimensionesController(mockTipoDimensionesRepository);
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

  it('throw a error if none repository is provided', () => {
      expect(() => new GetByIdTipoDimensionesController()).toThrow('No se ha recibido un repositorio');
  });
});