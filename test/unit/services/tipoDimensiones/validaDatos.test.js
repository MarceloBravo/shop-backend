
import validaDatos from '../../../../src/services/tipoDimensiones/validaDatos.js';

describe('validaDatos', () => {
  it('should not throw an error if data is valid', () => {
    const data = { nombre: 'Test Nombre', nombre_corto: 'TN' };
    expect(() => validaDatos(data)).not.toThrow();
  });

  it('should throw an error if nombre is missing', () => {
    const data = { nombre_corto: 'TN' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres."],
    }));
  });

  it('should throw an error if nombre is empty', () => {
    const data = { nombre: ' ', nombre_corto: 'TN' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres."],
    }));
  });

  it('should throw an error if nombre is too long', () => {
    const data = { nombre: 'a'.repeat(31), nombre_corto: 'TN' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres."],
    }));
  });

  it('should throw an error if nombre_corto is missing', () => {
    const data = { nombre: 'Test Nombre' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres."],
    }));
  });

  it('should throw an error if nombre_corto is empty', () => {
    const data = { nombre: 'Test Nombre', nombre_corto: ' ' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres."],
    }));
  });

  it('should throw an error if nombre_corto is too long', () => {
    const data = { nombre: 'Test Nombre', nombre_corto: 'a'.repeat(11) };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: ["El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres."],
    }));
  });

  it('should throw an error with multiple messages if both fields are invalid', () => {
    const data = { nombre: ' ', nombre_corto: ' ' };
    expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    expect(() => validaDatos(data)).toThrow(expect.objectContaining({
      details: [
        "El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres.",
        "El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres.",
      ],
    }));
  });
});
