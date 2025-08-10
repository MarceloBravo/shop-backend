import CreateSubCategoriaController from '../../../../src/controllers/subCategoria/CreateSubCategoriaController.js';
import CreateSubCategoriaService from '../../../../src/services/subCategoria/CreateSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/CreateSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('CreateSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    // Mock the instance of the service that the controller will create
    const mockServiceInstance = {
        execute: jest.fn(),
    };

    // Make the mocked CreateSubCategoriaService constructor return our mock instance
    CreateSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new CreateSubCategoriaController();
        req = {
            body: {
                nombre: 'Test SubCategoria',
                categoria_id: 1
            }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        // Clear mocks for each test
        jest.clearAllMocks();
    });

    it('should create a subcategory and return a success message', async () => {
        const createdSubCategoria = { id: 1, ...req.body };
        mockServiceInstance.execute.mockResolvedValue(createdSubCategoria); // Use the mock instance

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith({
            data: createdSubCategoria,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error); // Use the mock instance
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.body);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});