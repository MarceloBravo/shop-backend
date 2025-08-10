import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolPermisosModel } from '../../../src/models/RolPermisosModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';

describe('Integration Test: GetPageRolPermisosController', () => {
    let token;
    let rol;
    let pantalla;
    let accionesPantalla;
    let rolPermisos;

    const rolData = { nombre: 'TestRolForGetPage' };
    const pantallaData = { nombre: 'TestPantallaForGetPage', uri: '/test-getpage' };
    const accionesPantallaData = { permite_crear: true, permite_actualizar: true, permite_eliminar: true, permite_listar: true, permite_ver: true, acceso: true };
    const rolPermisosData = { crear: true, actualizar: true, eliminar: true, listar: true, ver: true };

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        
        rol = await RolModel.create(rolData);
        pantalla = await PantallaModel.create(pantallaData);
        
        const completeAccionesPantallaData = { ...accionesPantallaData, pantalla_id: pantalla.id };
        accionesPantalla = await AccionesPantallaModel.create(completeAccionesPantallaData);

        const completeRolPermisosData = { ...rolPermisosData, rol_id: rol.id, acciones_pantalla_id: accionesPantalla.id };
        rolPermisos = await RolPermisosModel.create(completeRolPermisosData);
    });

    afterAll(async () => {
        await RolPermisosModel.destroy({ where: { id: rolPermisos.id }, force: true });
        await AccionesPantallaModel.destroy({ where: { id: accionesPantalla.id }, force: true });
        await PantallaModel.destroy({ where: { id: pantalla.id }, force: true });
        await RolModel.destroy({ where: { id: rol.id }, force: true });
    });

    it('debe obtener una página de permisos de rol, incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/rol_permisos/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(Array.isArray(response.body.data.data)).toBe(true);
        
        const found = response.body.data.data.find(r => r.id === rolPermisos.id);
        expect(found).toBeDefined();
        expect(found).toHaveProperty('rol_id', rol.id);
    });
});