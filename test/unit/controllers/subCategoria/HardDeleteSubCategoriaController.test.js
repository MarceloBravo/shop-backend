import HardDeleteSubCategoriaController from '../../../../src/controllers/subCategoria/HardDeleteSubCategoriaController.js';
import HardDeleteSubCategoriaService from '../../../../src/services/subCategoria/HardDeleteSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/HardDeleteSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('HardDeleteSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    const mockRepository = {
        hardDelete: jest.fn(),
    }

    HardDeleteSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new HardDeleteSubCategoriaController(mockRepository);
        req = {
            params: { id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should hard delete a subcategory and return a success message', async () => {
        mockServiceInstance.execute.mockResolvedValue(true);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith({
            id: req.params.id,
            code: 200,
            mensaje: 'El registro ha sido eliminado exitosamente.'
        });
    });

    it('should return a message if subcategory could not be deleted or is inexistent', async () => {
        mockServiceInstance.execute.mockResolvedValue(false);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith({
            id: req.params.id,
            code: 500,
            mensaje: 'El registro no pudo ser eliminado o registro inexistente'
        });
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new HardDeleteSubCategoriaController()).toThrow('No se ha recibido un repositorio');
    });
});