import RolRepository from '../../../../src/repositories/RolRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';
jest.mock('../../../../src/repositories/RolRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');
    

import UpdateRolPermisosController from '../../../../src/controllers/RolPermisos/UpdateRolPermisosController.js';

describe('Unit Test: UpdateRolPermisosController', () => {
    let controller;
    let rolRepositoryMock;
    let pantallaRepositoryMock;   
    const mockRepository = {
        update: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        RolRepository.mockImplementation(() => {
            return {    
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        });
        PantallaRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        }); 
        controller = new UpdateRolPermisosController(mockRepository);
    });

    it('Actualiza un rolPermisos exitosamente', async () => {
        // Arrange
        const rolPermisosData = { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const mockResponse = { data: { id: 1, ...rolPermisosData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);
        const req = { params: { id: 1 }, body: rolPermisosData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, rolPermisosData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { rol_id: null, acciones_pantalla_id: null, crear: null, actualizar: null, eliminar: null, listar: null, ver: null };
        const req = { params: { id: 1 }, body: invalidData };
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
        const req = { params: { id: 1 }, body: rolPermisosData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockRepository.update.mockRejectedValue(error);

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