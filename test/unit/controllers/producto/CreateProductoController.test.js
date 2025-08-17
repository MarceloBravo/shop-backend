
import CreateProductoController from '../../../../src/controllers/producto/CreateProductoController.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

describe('CreateProductoController', () => {
  let controller;
  let mockOrchestrator;
  let req;
  let res;

  beforeEach(() => {
    mockOrchestrator = {
      createProducto: jest.fn(),
    };
    controller = new CreateProductoController(mockOrchestrator);
    req = {
      body: {
        nombre: 'Test Producto',
        descripcion: 'Test Descripcion',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product and return a success message', async () => {
    const mockResult = { id: 1, nombre: 'Test Producto' };
    mockOrchestrator.createProducto.mockResolvedValue(mockResult);

    await controller.execute(req, res);

    expect(mockOrchestrator.createProducto).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({
      result: mockResult,
      mensaje: 'El producto ha sido registrado exitosamente.',
    });
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockOrchestrator.createProducto.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockOrchestrator.createProducto).toHaveBeenCalledWith(req.body);
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default orchestrator if none is provided', () => {
    const defaultController = new CreateProductoController();
    expect(defaultController.orchestrator).toBeDefined();
  });
});
