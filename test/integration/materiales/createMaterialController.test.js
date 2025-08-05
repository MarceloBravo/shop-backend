import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: CreateMaterialController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        // Limpiar todas las materials después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should create a new material and return success response', async () => {
        const materialData = {
            valor: 'Lana',
        };

        const response = await request(app)
            .post('/api/v1/materiales') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(materialData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.valor).toBe(materialData.valor);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            valor: '', // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .post('/api/v1/materiales')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });

    it('should return an error if material name already exists', async () => {
        // Crear una material primero
        await MaterialModel.create({
            valor: 'Cuero',
        });

        const duplicateData = {
            valor: 'Cuero', // Mismo nombre para provocar error
        };

        const response = await request(app)
            .post('/api/v1/materiales')
            .set('Authorization', `Bearer ${token}`)
            .send(duplicateData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Ya existe un material con ese valor');
    });
}); 