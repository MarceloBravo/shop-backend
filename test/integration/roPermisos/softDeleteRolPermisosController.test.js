import request from 'supertest';
import app from '../../appTest.js';
import { RolPermisosModel } from '../../../src/models/RolPermisosModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';

describe('Integration Test: SoftDeleteRolPermisosController', () => {
    let token;
    let rol;
    let pantalla;
    let accionesPantalla;
    let rolPermisos;

    const rolData = { nombre: 'TestRolForSoftDelete' };
    const pantallaData = { nombre: 'TestPantallaForSoftDelete', uri: '/test-softdelete' };
    const accionesPantallaData = { permite_crear: true, permite_actualizar: true, permite_eliminar: true, permite_listar: true, permite_ver: true, acceso: true };
    const rolPermisosData = { crear: true, actualizar: true, eliminar: true, listar: true, ver: true };

    beforeAll(async () => {
        token = global.testToken
        
        rol = await RolModel.create(rolData);
        pantalla = await PantallaModel.create(pantallaData);
        
        const completeAccionesPantallaData = { ...accionesPantallaData, pantalla_id: pantalla.id };
        accionesPantalla = await AccionesPantallaModel.create(completeAccionesPantallaData);

        const completeRolPermisosData = { ...rolPermisosData, rol_id: rol.id, acciones_pantalla_id: accionesPantalla.id };
        rolPermisos = await RolPermisosModel.create(completeRolPermisosData);
    });

    afterAll(async () => {
        // Clean up the soft-deleted record permanently
        await RolPermisosModel.destroy({ where: { id: rolPermisos.id }, force: true });
        await AccionesPantallaModel.destroy({ where: { id: accionesPantalla.id }, force: true });
        await PantallaModel.destroy({ where: { id: pantalla.id }, force: true });
        await RolModel.destroy({ where: { id: rol.id }, force: true });
    });

    it('debe eliminar lógicamente un rolPermisos', async () => {
        const response = await request(app)
            .patch(`/api/v1/rol_permisos/${rolPermisos.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('code', 200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido borrado exitosamente.');

        // Verify that the record still exists but with deleted_at not null
        const deletedRecord = await RolPermisosModel.findByPk(rolPermisos.id, { paranoid: false });
        expect(deletedRecord).not.toBeNull();
        expect(deletedRecord.deletedAt).not.toBeNull(); // Sequelize uses camelCase for this field by default
    });

    it('debe retornar error si el rolPermisos no existe', async () => {
        const nonExistentId = 999999;
        const response = await request(app)
            .patch(`/api/v1/rol_permisos/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404); // The controller returns 404 for not found
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Permisos no encontrados');
    });
});