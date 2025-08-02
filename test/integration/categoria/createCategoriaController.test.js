import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: CreateCategoriaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        // Limpiar todos los categoriaes después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should create a new categoria and return success response', async () => {
        const categoriaData = {
            nombre: 'Categoría 1',
            descripcion: 'Descripción categoría 1'
        };

        const response = await request(app)
            .post('/api/v1/categoria') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(categoriaData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(categoriaData.nombre);
        expect(response.body.data.descripcion).toBe(categoriaData.descripcion);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            descripcion: ''
        };

        const response = await request(app)
            .post('/api/v1/categoria')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
