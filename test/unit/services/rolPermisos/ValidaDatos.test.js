import validaDatos from '../../../../src/services/RolPermisos/ValidaDatos';
import RolRepository from '../../../../src/repositories/RolRepository';
import PantallaRepository from '../../../../src/repositories/PantallaRepository';

jest.mock('../../../../src/repositories/RolRepository');
jest.mock('../../../../src/repositories/PantallaRepository');

describe('validaDatos', () => {
  let validData;

  beforeEach(() => {
    // Restablecer mocks antes de cada prueba
    RolRepository.mockClear();
    PantallaRepository.mockClear();

    // Mockear las implementaciones de los repositorios
    RolRepository.prototype.getById = jest.fn();
    PantallaRepository.prototype.getById = jest.fn();

    validData = {
      rol_id: 1,
      acciones_pantalla_id: 1,
      crear: true,
      actualizar: true,
      eliminar: true,
      listar: true,
      ver: true,
    };
  });

  test('debería pasar si todos los datos son válidos', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    await expect(validaDatos(validData)).resolves.not.toThrow();
  });

  test('debería lanzar un error si rol_id no es válido', async () => {
    RolRepository.prototype.getById.mockResolvedValue(null);
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, rol_id: 999 };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
      await validaDatos(data);
    } catch (error) {
      expect(error.details).toContain("El 'rol' no es válido o no existe.");
    }
  });

  test('debería lanzar un error si acciones_pantalla_id no es válido', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue(null);

    const data = { ...validData, acciones_pantalla_id: 999 };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
      await validaDatos(data);
    } catch (error) {
      expect(error.details).toContain("La 'pantalla' no es válida o no existe.");
    }
  });

  test('debería lanzar un error si falta el campo "crear"', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, crear: undefined };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
        await validaDatos(data);
      } catch (error) {
        expect(error.details).toContain("El campo 'crear' es obligatorio.");
      }
  });

  test('debería lanzar un error si falta el campo "actualizar"', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, actualizar: null };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
        await validaDatos(data);
      } catch (error) {
        expect(error.details).toContain("El campo 'actualizar' es obligatorio.");
      }
  });

  test('debería lanzar un error si falta el campo "eliminar"', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, eliminar: undefined };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
        await validaDatos(data);
      } catch (error) {
        expect(error.details).toContain("El campo 'eliminar' es obligatorio.");
      }
  });

  test('debería lanzar un error si falta el campo "listar"', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, listar: null };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
        await validaDatos(data);
      } catch (error) {
        expect(error.details).toContain("El campo 'listar' es obligatorio.");
      }
  });

  test('debería lanzar un error si falta el campo "ver"', async () => {
    RolRepository.prototype.getById.mockResolvedValue({ id: 1 });
    PantallaRepository.prototype.getById.mockResolvedValue({ id: 1 });

    const data = { ...validData, ver: undefined };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
        await validaDatos(data);
      } catch (error) {
        expect(error.details).toContain("El campo 'ver' es obligatorio.");
      }
  });

  test('debería acumular múltiples errores', async () => {
    RolRepository.prototype.getById.mockResolvedValue(null);
    PantallaRepository.prototype.getById.mockResolvedValue(null);

    const data = { ...validData, rol_id: 999, acciones_pantalla_id: 999, crear: undefined };
    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    try {
      await validaDatos(data);
    } catch (error) {
      expect(error.details).toHaveLength(3);
      expect(error.details).toContain("El 'rol' no es válido o no existe.");
      expect(error.details).toContain("La 'pantalla' no es válida o no existe.");
      expect(error.details).toContain("El campo 'crear' es obligatorio.");
    }
  });
});