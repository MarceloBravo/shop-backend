import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MarcaModel } = db;

describe('Integration Test: CreateMarcaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    afterEach(async () => {
        // Limpiar todas las marcas después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should create a new marca and return success response', async () => {
        const marcaData = {
            nombre: 'Nike',
            logo: 'path/to/nike.png'
        };

        const response = await request(app)
            .post('/api/v1/marca') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(marcaData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(marcaData.nombre);
        expect(response.body.data.logo).toBe(marcaData.logo);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            logo: 'path/to/logo.png'
        };

        const response = await request(app)
            .post('/api/v1/marca')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });

    it('should return an error if marca name already exists', async () => {
        // Crear una marca primero
        await MarcaModel.create({
            nombre: 'Nike',
            logo: 'path/to/nike.png'
        });

        const duplicateData = {
            nombre: 'Nike', // Mismo nombre para provocar error
            logo: 'path/to/another-logo.png'
        };

        const response = await request(app)
            .post('/api/v1/marca')
            .set('Authorization', `Bearer ${token}`)
            .send(duplicateData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Ya existe una marca con ese nombre');
    });
}); 