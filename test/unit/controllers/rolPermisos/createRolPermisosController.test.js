// Mock del repositorio antes de importar el controlPermisosador
import RolRepository from '../../../../src/repositories/RolRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';
jest.mock('../../../../src/repositories/RolRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

import CreateRolPermisosController from '../../../../src/controllers/RolPermisos/CreateRolPermisosController.js';

describe('Unit Test: CreateRolPermisosController', () => {
    let controller;
    const mockRepository = {
        create: jest.fn(),
        getBy: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        RolRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            }
        });
        PantallaRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            }
        });
        controller = new CreateRolPermisosController(mockRepository);
    });

    it('Crea un rolPermisos exitosamente', async () => {
        // Arrange
        const rolPermisosData = { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const mockResponse = { id: 1, ...rolPermisosData };
        mockRepository.create.mockResolvedValue(mockResponse);

        const req = {
            body: { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith(rolPermisosData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { rolPermisos_id: null, acciones_pantalla_id: null, crear: null, actualizar: null, eliminar: null, listar: null, ver: null };
        const req = {
            body: invalidData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 400,
            details: [
                "El 'rol' no es válido o no existe.", 
                "La 'pantalla' no es válida o no existe.", 
                "El campo 'crear' es obligatorio.", 
                "El campo 'actualizar' es obligatorio.", 
                "El campo 'eliminar' es obligatorio.", 
                "El campo 'listar' es obligatorio.", 
                "El campo 'ver' es obligatorio."
            ],
            error: "Error: Datos no válidos:"
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const rolPermisosData = { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const req = {
            body: rolPermisosData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const error = new Error('Error de base de datos');
        mockRepository.create.mockRejectedValue(error);

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            details: [],
            error: expect.any(String)
        }));
    });
}); 