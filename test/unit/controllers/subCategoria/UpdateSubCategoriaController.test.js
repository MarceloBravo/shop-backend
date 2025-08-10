import UpdateSubCategoriaController from '../../../../src/controllers/subCategoria/UpdateSubCategoriaController.js';
import UpdateSubCategoriaService from '../../../../src/services/subCategoria/UpdateSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/UpdateSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('UpdateSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    UpdateSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new UpdateSubCategoriaController();
        req = {
            params: { id: 1 },
            body: { nombre: 'Updated SubCategoria', categoria_id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should update a subcategory and return a success message', async () => {
        const updatedSubCategoria = { id: 1, nombre: 'Updated SubCategoria', categoria_id: 1 };
        mockServiceInstance.execute.mockResolvedValue({ data: updatedSubCategoria, created: false });

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.json).toHaveBeenCalledWith({
            subcategoria: updatedSubCategoria,
            mensaje: 'Registro actualizado exitosamente.'
        });
    });

    it('should create a subcategory and return a success message if not found', async () => {
        const createdSubCategoria = { id: 1, nombre: 'New SubCategoria', categoria_id: 1 };
        mockServiceInstance.execute.mockResolvedValue({ data: createdSubCategoria, created: true });

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.json).toHaveBeenCalledWith({
            subcategoria: createdSubCategoria,
            mensaje: 'Registro creado exitosamente.'
        });
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id, req.body);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});