
import GetPageUsuarioController from '../../../../src/controllers/usuario/GetPageUsuarioController.js';
import GetPageUsuarioService from '../../../../src/services/usuario/GetPageUsuarioService.js';
import UsuarioRepository from '../../../../src/repositories/UsuarioRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/usuario/GetPageUsuarioService.js');
jest.mock('../../../../src/repositories/UsuarioRepository.js');

describe('GetPageUsuarioController', () => {
  let getPageUsuarioController;
  let mockRequest;
  let mockResponse;
  let mockGetPageService;
  let mockUsuarioRepository;

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetPageService = new GetPageUsuarioService();
    mockGetPageService.execute = jest.fn();
    mockUsuarioRepository = {
      getPage: jest.fn(),
    }
    GetPageUsuarioService.mockImplementation(() => mockGetPageService);

    getPageUsuarioController = new GetPageUsuarioController(mockUsuarioRepository);
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.status || 500, ...error }));
  });

  it('should return a page of usuarios', async () => {
    const mockRows = [{ id: 1 }, { id: 2 }];
    const mockCount = 20;
    const mockTotPag = 2;

    mockRequest.params.pag = 1;
    mockRequest.params.limit = 10;

    mockGetPageService.execute.mockResolvedValue({ rows: mockRows, count: mockCount, totPag: mockTotPag });

    await getPageUsuarioController.execute(mockRequest, mockResponse);

    expect(mockGetPageService.execute).toHaveBeenCalledWith(1, 10);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { data: mockRows, totReg: mockCount, rows: mockRows.length, pag: 1, totPag: mockTotPag },
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.status = 500;

    mockRequest.params.pag = 1;
    mockRequest.params.limit = 10;

    mockGetPageService.execute.mockRejectedValue(error);

    await getPageUsuarioController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, status: 500 });
  });
  
  it('throw a error if none repository is provided', () => {
    expect(() => new GetPageUsuarioController()).toThrow('No se ha recibido un repositorio');
  });
});
