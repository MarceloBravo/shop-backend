import GetPageProductoWithDeletedController from '../../../../src/controllers/producto/GetPageProductoWithDeletedController.js';
import { handleError } from '../../../../src/shared/functions.js';
import GetPageProductoService from '../../../../src/services/producto/GetPageProductoService.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

jest.mock('../../../../src/services/producto/GetPageProductoService.js');

describe('GetPageProductoWithDeletedController', () => {
  let controller;
  let mockService;
  let req;
  let res;

  beforeEach(() => {
    mockService = {
      execute: jest.fn(),
    };
    GetPageProductoService.mockImplementation(() => mockService);

    controller = new GetPageProductoWithDeletedController();
    req = {
      params: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a page of products including deleted and return them', async () => {
    const mockData = { rows: [{ id: 1, nombre: 'Test Producto', deletedAt: '2025-08-17' }], count: 1, totPag: 1 };
    mockService.execute.mockResolvedValue(mockData);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1, 10, false, null);
    expect(res.json).toHaveBeenCalledWith({ data: { data: mockData.rows, totReg: mockData.count, rows: mockData.rows.length, pag: 1, totPag: 1 } });
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockService.execute.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1, 10, false, null);
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default repository if none is provided', () => {
    const controllerWithDefaultRepo = new GetPageProductoWithDeletedController();
    expect(controllerWithDefaultRepo.service).toBeDefined();
  });
});