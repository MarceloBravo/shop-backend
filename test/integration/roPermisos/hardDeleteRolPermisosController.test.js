import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolPermisosModel } from '../../../src/models/RolPermisosModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';

describe('Integration Test: HardDeleteRolPermisosController', () => {
    let token;
    let rol;
    let pantalla;
    let accionesPantalla;
    let rolPermisos;

    const rolData = { nombre: 'TestRolForHardDelete' };
    const pantallaData = { nombre: 'TestPantallaForHardDelete', uri: '/test-harddelete' };
    const accionesPantallaData = { permite_crear: true, permite_actualizar: true, permite_eliminar: true, permite_listar: true, permite_ver: true, acceso: true };
    const rolPermisosData = { crear: true, actualizar: true, eliminar: true, listar: true, ver: true };

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        
        rol = await RolModel.create(rolData);
        pantalla = await PantallaModel.create(pantallaData);
        
        const completeAccionesPantallaData = { ...accionesPantallaData, pantalla_id: pantalla.id };
        accionesPantalla = await AccionesPantallaModel.create(completeAccionesPantallaData);
    });

    afterAll(async () => {
        // Clean up related entities
        await AccionesPantallaModel.destroy({ where: { id: accionesPantalla.id }, force: true });
        await PantallaModel.destroy({ where: { id: pantalla.id }, force: true });
        await RolModel.destroy({ where: { id: rol.id }, force: true });
    });

    beforeEach(async () => {
        // Create a new rolPermisos before each test
        const completeRolPermisosData = { ...rolPermisosData, rol_id: rol.id, acciones_pantalla_id: accionesPantalla.id };
        rolPermisos = await RolPermisosModel.create(completeRolPermisosData);
    });

    afterEach(async () => {
        // Ensure the rolPermisos is destroyed after each test, even if the test fails
        if (rolPermisos) {
            await RolPermisosModel.destroy({ where: { id: rolPermisos.id }, force: true });
        }
    });

    it('debe eliminar físicamente un rolPermisos', async () => {
        const response = await request(app)
            .delete(`/api/v1/rol_permisos/${rolPermisos.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', rolPermisos.id.toString());
        expect(response.body).toHaveProperty('code', 200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido eliminado exitosamente.');

        // Verify that the record no longer exists
        const deletedRecord = await RolPermisosModel.findByPk(rolPermisos.id, { paranoid: false });
        expect(deletedRecord).toBeNull();
        rolPermisos = null; // prevent afterEach from trying to delete it again
    });

    it('debe retornar error si el rolPermisos no existe', async () => {
        const nonExistentId = 999999;
        const response = await request(app)
            .delete(`/api/v1/rol_permisos/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(500);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Permisos no encontrados');
    });
});