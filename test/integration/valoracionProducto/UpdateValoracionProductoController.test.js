
import request from 'supertest';
import app from '../../appTest.js';
import { createProductoTestData, destroyProductoTestData, createValoracionProductoTestData, createUserAndLogin } from '../helpers/TestAuthHelper.js';

describe('UpdateValoracionProductoController', () => {
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe actualizar una valoración de producto correctamente', async () => {
        valoracion.estrellas = 3;
        valoracion.comentario = 'Actualizado';

        const response = await request(app)
            .put(`/api/v1/valoracion_producto/${valoracion.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(valoracion.toJSON());
            
        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('debe retornar un error si la valoración no existe', async () => {
        valoracion.estrellas = 3;
        valoracion.comentario = 'Actualizado';
        const updateData = {...valoracion.toJSON()};
        delete updateData.id;


        const response = await request(app)
            .put('/api/v1/valoracion_producto/999')
            .set('Authorization', `Bearer ${token}`)
            .send(updateData);
            
        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');
    });
});
