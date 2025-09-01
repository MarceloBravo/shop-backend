import GetPageTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/GetPageTipoDimensionesController.js';
import GetPageTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetPageTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetPageTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('GetPageTipoDimensionesController', () => {
  let getPageTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockGetPageService;
  let mockTipoDimensionesRepository

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetPageService = new GetPageTipoDimensionesService();
    mockGetPageService.execute = jest.fn();
    mockTipoDimensionesRepository = {
      getPage: jest.fn()      
    }
    GetPageTipoDimensionesService.mockImplementation(() => mockGetPageService);

    getPageTipoDimensionesController = new GetPageTipoDimensionesController(mockTipoDimensionesRepository);
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should return a page of tipo dimensiones', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    const mockTotPag = 2;

    mockRequest.params.pag = 1;
    mockRequest.params.limit = 10;

    mockGetPageService.execute.mockResolvedValue({ rows: mockRows, count: mockCount, totPag: mockTotPag });

    await getPageTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockGetPageService.execute).toHaveBeenCalledWith(1, 10);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { data: mockRows, totReg: mockCount, rows: mockRows.length, pag: 1, totPag: mockTotPag },
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.code = 500;

    mockRequest.params.pag = 1;
    mockRequest.params.limit = 10;

    mockGetPageService.execute.mockRejectedValue(error);

    await getPageTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, message: 'Database error' });
  });

  it('throw a error if none repository is provided', () => {
    expect(() => new GetPageTipoDimensionesController()).toThrow('No se ha recibido un repositorio');
  });
});