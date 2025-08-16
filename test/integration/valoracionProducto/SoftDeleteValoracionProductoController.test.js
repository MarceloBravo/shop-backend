
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData, createValoracionProductoTestData } from '../helpers/TestAuthHelper.js';

describe('SoftDeleteValoracionProductoController', () => {
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe eliminar lógicamente una valoración de producto', async () => {
        const response = await request(app)
            .patch(`/api/v1/valoracion_producto/${valoracion.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');
    });

    it('debe retornar un error si la valoración no existe', async () => {
        const response = await request(app)
            .patch('/api/v1/valoracion_producto/999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: Valoración no encontrada');
    });
});
