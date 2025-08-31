
import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import { ValoracionProductoModel } from '../../../src/models/ValoracionProductoModel.js';


describe('CreateValoracionProductoController', () => {
    let token;
    let producto;

    beforeAll(async () => {
        token = global.testToken
        producto = await createProductoTestData();
        await ValoracionProductoModel.destroy({ where: {}, force: true }); // Limpiar valoraciones previas
    });

    afterAll(async () => {
        await destroyProductoTestData();
        await ValoracionProductoModel.destroy({ where: {}, force: true }); // Limpiar valoraciones después de las pruebas
    });

    it('debe crear una nueva valoración de producto correctamente', async () => {
        const data = {
            producto_id: producto.id,
            estrellas: 5,
            comentario: 'Excelente producto',
            email: 'test@test.com',
            nombre: 'Test User',
            foto: 'http://example.com/foto.jpg'
        };

        const response = await request(app)
            .post('/api/v1/valoracion_producto')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('debe retornar un error si los datos no son válidos', async () => {
        const data = {
            producto_id: producto.id,
            email:  null,
            calificacion: 6, // Calificación inválida
            comentario: 'Excelente producto'
        };

        const response = await request(app)
            .post('/api/v1/valoracion_producto')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
            
        expect(response.status).toBe(400);
    });
});
