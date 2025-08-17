
import UpdateProductoController from '../../../../src/controllers/producto/UpdateProductoController.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

describe('UpdateProductoController', () => {
  let controller;
  let mockOrchestrator;
  let req;
  let res;

  beforeEach(() => {
    mockOrchestrator = {
      updateProducto: jest.fn(),
    };
    controller = new UpdateProductoController(mockOrchestrator);
    req = {
      params: { id: 1 },
      body: { nombre: 'Test Producto', descripcion: 'Test Descripcion' },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a product and return a success message for update', async () => {
    const mockResult = { id: 1, nombre: 'Test Producto', created: false };
    mockOrchestrator.updateProducto.mockResolvedValue(mockResult);

    await controller.execute(req, res);

    expect(mockOrchestrator.updateProducto).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ data: mockResult, mensaje: 'Registro actualizado exitosamente.' });
  });

  it('should update a product and return a success message for creation', async () => {
    const mockResult = { id: 1, nombre: 'Test Producto', created: true };
    mockOrchestrator.updateProducto.mockResolvedValue(mockResult);

    await controller.execute(req, res);

    expect(mockOrchestrator.updateProducto).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ data: mockResult, mensaje: 'Registro creado exitosamente.' });
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockOrchestrator.updateProducto.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockOrchestrator.updateProducto).toHaveBeenCalledWith(1, req.body);
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default orchestrator if none is provided', () => {
    const defaultController = new UpdateProductoController();
    expect(defaultController.orchestrator).toBeDefined();
  });
});
