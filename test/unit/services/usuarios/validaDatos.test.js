
import { validaDatos } from '../../../../src/services/usuario/validaDatos.js';
import { validaRut } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/shared/functions.js');

describe('validaDatos for Usuario', () => {

  beforeEach(() => {
    validaRut.mockReturnValue(true);
  });

  const callValidaDatos = (data, isUpdate = false) => {
    try {
      validaDatos(data, isUpdate);
      return null; // No error thrown
    } catch (error) {
      return {
        code: error.code,
        error: error.message,
        details: error.details
      }
    }
  };


  it('should not throw an error if data is valid', () => {
    const data = {
      rut: '12345678-9',
      nombres: 'Test',
      apellido1: 'User',
      direccion: 'Test Address',
      fono: '123456789',
      email: 'test@test.com',
      user_name: 'testuser',
      password: 'password123'
    };
    expect(() => validaDatos(data)).not.toThrow();
  });

  it('should throw an error for invalid rut', () => {
    validaRut.mockReturnValue(false);
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser',
        password: 'password123'
      };
    
    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El rut ingresado no es válido.');
  });

  it('should throw an error for missing or invalid nombres', () => {
    const data = {
        rut: '12345678-9',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser',
        password: 'password123'
      };
    
    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('Ingresa un valor válido para el nombre.');
  });

  it('should throw an error for missing or invalid apellido1', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser',
        password: 'password123'
      };

    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El primer apellido es obligatorio, ingresa un valor válido para el primer apellido.');
  });

  it('should throw an error for missing or invalid direccion', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser',
        password: 'password123'
      };
    
    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El campo dirección es obligatorio, ingresa un valor válido para la dirección.');
  });

  it('should throw an error for missing or invalid fono', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        email: 'test@test.com',
        user_name: 'testuser',
        password: 'password123'
      };

    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El campo fono es obligatorio, ingresa un valor válido para el fono.');
  });

  it('should throw an error for missing or invalid email', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        user_name: 'testuser',
        password: 'password123'
      };

    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El campo email es obligatorio, ingresa un valor válido para el email.');      
  });

  it('should throw an error for missing or invalid user_name', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        password: 'password123'
      };

    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('El campo nombre de usuario es obligatorio, ingresa un valor válido para el nombre de usuario.');      
  });

  it('should throw an error for missing password on create', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser'
      };

    const response = callValidaDatos(data);
    expect(response.code).toBe(400);
    expect(response.error).toBe('Datos no válidos:');
    expect(response.details[0]).toBe('La contraseña es obligatoria, ingresa un valor válido para el campo contraseña.');      
  });

  it('should not throw an error for missing password on update', () => {
    const data = {
        rut: '12345678-9',
        nombres: 'Test',
        apellido1: 'User',
        direccion: 'Test Address',
        fono: '123456789',
        email: 'test@test.com',
        user_name: 'testuser'
      };
    
    expect(() => validaDatos(data, true)).not.toThrow();
  });

});
