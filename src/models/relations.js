// Refactorizado para ser compatible con carga dinámica y Jest/ESM
export function defineRelations(db) {
  const {
    UsuarioModel,
    RolModel,
    RolPermisosModel,
    AccionesPantallaModel,
    PantallaModel,
    MenuModel,
    ProductoModel,
    CategoriaModel,
    SubCategoriaModel,
    MarcaModel,
    ColorModel,
    ColorProductoModel,
    MaterialProductoModel,
    MaterialModel,
    TallaLetraProductoModel,
    TallaLetraModel,
    TallaNumericaModel,
    TallaNumericaProductoModel,
    DimensionesProductoModel,
    TipoDimensionesModel,
    GeneroModel,
    AtributosProductoModel,
    AtributosModel,
    ValoracionProductoModel,
    PesoProductoModel
  } = db;

  RolModel.hasMany(UsuarioModel, { foreignKey: "rol_id", sourceKey: "id" });
  UsuarioModel.belongsTo(RolModel, { foreignKey: "rol_id", targetKey: "id" });

  RolModel.hasMany(RolPermisosModel, { foreignKey: "rol_id", sourceKey: "id" });
  RolPermisosModel.belongsTo(RolModel, { foreignKey: "rol_id", targetKey: "id" });

  AccionesPantallaModel.hasMany(RolPermisosModel, { foreignKey: "acciones_pantalla_id", targetKey: "id" });
  RolPermisosModel.belongsTo(AccionesPantallaModel, { foreignKey: "acciones_pantalla_id", sourceKey: "id" });

  PantallaModel.hasMany(AccionesPantallaModel, { foreignKey: "pantalla_id", targetKey: "id" });
  AccionesPantallaModel.belongsTo(PantallaModel, { foreignKey: "pantalla_id", sourceKey: "id" });

  PantallaModel.hasMany(MenuModel, { foreignKey: "pantalla_id", targetKey: "id" });
  MenuModel.belongsTo(PantallaModel, { foreignKey: "pantalla_id", sourceKey: "id" });

  CategoriaModel.hasMany(SubCategoriaModel, { foreignKey: "categoria_id", targetKey: "id" });
  SubCategoriaModel.belongsTo(CategoriaModel, { foreignKey: "categoria_id", sourceKey: "id" });

  SubCategoriaModel.hasMany(ProductoModel, { foreignKey: "sub_categoria_id", targetKey: "id" });
  ProductoModel.belongsTo(SubCategoriaModel, { foreignKey: "sub_categoria_id", sourceKey: "id", as: 'subcategoria' });

  MarcaModel.hasMany(ProductoModel, { foreignKey: "marca_id", targetKey: "id" });
  ProductoModel.belongsTo(MarcaModel, { foreignKey: "marca_id", sourceKey: "id", as: 'marca' });

  GeneroModel.hasMany(ProductoModel, { foreignKey: "genero_id", targetKey: "id" });
  ProductoModel.belongsTo(GeneroModel, { foreignKey: "genero_id", sourceKey: "id", as: 'genero' });

  // Color Producto
  ProductoModel.hasMany(ColorProductoModel, { foreignKey: "producto_id", as: 'colores', sourceKey: "id", onDelete: 'CASCADE' });
  ColorProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  ColorModel.hasMany(ColorProductoModel, { foreignKey: "color_id", targetKey: "id"});
  ColorProductoModel.belongsTo(ColorModel, { foreignKey: "color_id", sourceKey: "id", as: 'color' });

  // Material Producto
  ProductoModel.hasMany(MaterialProductoModel, { foreignKey: "producto_id", as: 'materiales', sourceKey: "id", onDelete: 'CASCADE' });
  MaterialProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  MaterialModel.hasMany(MaterialProductoModel, { foreignKey: "material_id", targetKey: "id" });
  MaterialProductoModel.belongsTo(MaterialModel, { foreignKey: "material_id", sourceKey: "id", as: 'material' });

  // Talla Letra Producto
  ProductoModel.hasMany(TallaLetraProductoModel, { foreignKey: "producto_id", as: 'tallas_letra', sourceKey: "id", onDelete: 'CASCADE' });
  TallaLetraProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  TallaLetraModel.hasMany(TallaLetraProductoModel, { foreignKey: "talla_letra_id", targetKey: "id" });
  TallaLetraProductoModel.belongsTo(TallaLetraModel, { foreignKey: "talla_letra_id", sourceKey: "id", as: 'talla' });

  // Talla Numérica Producto
  ProductoModel.hasMany(TallaNumericaProductoModel, { foreignKey: "producto_id", as: 'tallas_numerica', sourceKey: "id", onDelete: 'CASCADE' });
  TallaNumericaProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  TallaNumericaModel.hasMany(TallaNumericaProductoModel, { foreignKey: "talla_numerica_id", targetKey: "id" });
  TallaNumericaProductoModel.belongsTo(TallaNumericaModel, { foreignKey: "talla_numerica_id", sourceKey: "id", as: 'talla' });

  // Dimensiones Producto
  ProductoModel.hasMany(DimensionesProductoModel, { foreignKey: "producto_id", as: 'dimensiones', sourceKey: "id", onDelete: 'CASCADE' });
  DimensionesProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  TipoDimensionesModel.hasMany(DimensionesProductoModel, { foreignKey: "tipo_dimension_id", targetKey: "id" });
  DimensionesProductoModel.belongsTo(TipoDimensionesModel, { foreignKey: "tipo_dimension_id", sourceKey: "id", as: 'unidad_metrica' });

  // Atributos Producto
  ProductoModel.hasMany(AtributosProductoModel, { foreignKey: "producto_id", as: "atributos_producto", sourceKey: "id", constraints: true, onDelete: 'CASCADE' });
  AtributosProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id", constraints: true });
  AtributosModel.hasMany(AtributosProductoModel, { foreignKey: "atributo_id", targetKey: "id" });
  AtributosProductoModel.belongsTo(AtributosModel, { foreignKey: "atributo_id", sourceKey: "id", as: "atributo" });

  // Peso Producto
  ProductoModel.hasMany(PesoProductoModel, { foreignKey: "producto_id", as: 'pesos', sourceKey: "id", onDelete: 'CASCADE' });
  PesoProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
  TipoDimensionesModel.hasMany(PesoProductoModel, { foreignKey: "tipo_dimension_id", targetKey: "id" });
  PesoProductoModel.belongsTo(TipoDimensionesModel, { foreignKey: "tipo_dimension_id", sourceKey: "id", as: 'unidad_metrica' });

  // Valoración Producto
  ProductoModel.hasMany(ValoracionProductoModel, { foreignKey: "producto_id", as: 'valoraciones', sourceKey: "id", onDelete: 'CASCADE' });
  ValoracionProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id", as: "producto", targetKey: "id" });
}
