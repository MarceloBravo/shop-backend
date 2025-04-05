import { UsuarioModel } from "./UsuarioModel.js";
import { RolModel } from "./RolModel.js";
import { RolPermisosModel } from "./RolPermisosModel.js";
import { AccionesPantallaModel } from "./AccionesPantallaModel.js";
import { PantallaModel } from "./PantallaModel.js";
import { AdminMenuModel } from "./AdminMenuModel.js";
import { ProductoModel } from "./ProductoModel.js";
import { CategoriaModel } from "./CategoriaModel.js";
import { SubCategoriaModel } from "./SubCategoriaModel.js";
import { MarcaModel } from "./MarcaModel.js";
import { ColorModel } from "./ColorModel.js";
import { ColorProductoModel } from "./ColorProductoModel.js";
import { MaterialProductoModel } from "./MaterialProductoModel.js";
import { MaterialModel } from "./MaterialModel.js";
import { TallaLetraProductoModel } from "./TallaLetraProductoModel.js";
import { TallaLetraModel } from "./TallaLetraModel.js";
import { TallaNumericaModel } from "./TallaNumericaModel.js";
import { TallaNumericaProductoModel } from "./TallaNumericaProductoModel.js";
import { DimensionesModel } from "./DimensionesModel.js";
import { DimensionesProductoModel } from "./DimensionesProductoModel.js";
import { TipoDimensionesModel } from "./TipoDimensionesModel.js";
import { GeneroModel } from "./GeneroModel.js";
import { AtributosProductoModel } from "./AtributosProductoModel.js";
import { AtributosModel } from "./AtributosModel.js";

// Establecer relaciones
RolModel.hasMany(UsuarioModel, { foreignKey: "rol_id", sourceKey: "id" });
UsuarioModel.belongsTo(RolModel, { foreignKey: "rol_id", targetKey: "id" });

RolModel.hasMany(RolPermisosModel, { foreignKey: "rol_id", sourceKey: "id" });
RolPermisosModel.belongsTo(RolModel, { foreignKey: "rol_id", targetKey: "id" });

AccionesPantallaModel.hasMany(RolPermisosModel, { foreignKey: "id_acciones_pantalla", targetKey: "id" });
RolPermisosModel.belongsTo(AccionesPantallaModel, { foreignKey: "id_acciones_pantalla", sourceKey: "id" });

PantallaModel.hasMany(AccionesPantallaModel, { foreignKey: "pantalla_id", targetKey: "id" });
AccionesPantallaModel.belongsTo(PantallaModel, { foreignKey: "pantalla_id", sourceKey: "id" });

PantallaModel.hasMany(AdminMenuModel, { foreignKey: "pantalla_id", targetKey: "id" });
AdminMenuModel.belongsTo(PantallaModel, { foreignKey: "pantalla_id", sourceKey: "id" });

CategoriaModel.hasMany(SubCategoriaModel, { foreignKey: "categoria_id", targetKey: "id" });
SubCategoriaModel.belongsTo(CategoriaModel, { foreignKey: "categoria_id", sourceKey: "id" });

SubCategoriaModel.hasMany(ProductoModel, { foreignKey: "sub_categoria_id", targetKey: "id" });
ProductoModel.belongsTo(SubCategoriaModel, { foreignKey: "sub_categoria_id", sourceKey: "id" });

MarcaModel.hasMany(ProductoModel, { foreignKey: "marca_id", targetKey: "id" });
ProductoModel.belongsTo(MarcaModel, { foreignKey: "marca_id", sourceKey: "id" });
//
// ColorProducto → Producto (M:N)
ProductoModel.hasMany(ColorProductoModel, { foreignKey: "producto_id" });
ColorProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id" });

// MaterialProducto → Producto (M:N)
ProductoModel.hasMany(MaterialProductoModel, { foreignKey: "producto_id" });
MaterialProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id" });

// TallaLetraProducto → Producto (M:N)
ProductoModel.hasMany(TallaLetraProductoModel, { foreignKey: "producto_id" });
TallaLetraProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id" });

// TallaNumericaProducto → Producto (M:N)
ProductoModel.hasMany(TallaNumericaProductoModel, { foreignKey: "producto_id" });
TallaNumericaProductoModel.belongsTo(ProductoModel, { foreignKey: "producto_id" });

ColorModel.hasMany(ColorProductoModel, { foreignKey: "color_id", targetKey: "id" });
ColorProductoModel.belongsTo(ColorModel, { foreignKey: "color_id", sourceKey: "id" });

MaterialModel.hasMany(MaterialProductoModel, { foreignKey: "material_id", targetKey: "id" });
MaterialProductoModel.belongsTo(MaterialModel, { foreignKey: "material_id", sourceKey: "id" });

TallaLetraModel.hasMany(TallaLetraProductoModel, { foreignKey: "talla_letra_id", targetKey: "id" });
TallaLetraProductoModel.belongsTo(TallaLetraModel, { foreignKey: "talla_letra_id", sourceKey: "id" });

TallaNumericaModel.hasMany(TallaNumericaProductoModel, { foreignKey: "talla_numerica_id", targetKey: "id" });
TallaNumericaProductoModel.belongsTo(TallaNumericaModel, { foreignKey: "talla_numerica_id", sourceKey: "id" });

DimensionesModel.hasMany(DimensionesProductoModel, { foreignKey: "dimensiones_id", targetKey: "id" });
DimensionesProductoModel.belongsTo(DimensionesModel, { foreignKey: "dimensiones_id", sourceKey: "id" });

TipoDimensionesModel.hasMany(DimensionesModel, { foreignKey: "tipo_dimension_id", targetKey: "id" });
DimensionesModel.belongsTo(TipoDimensionesModel, { foreignKey: "tipo_dimension_id", sourceKey: "id" });

GeneroModel.hasMany(ProductoModel, { foreignKey: "genero_id", targetKey: "id" });
ProductoModel.belongsTo(GeneroModel, { foreignKey: "genero_id", sourceKey: "id" });

AtributosModel.hasMany(AtributosProductoModel, { foreignKey: "atributo_id"});
AtributosProductoModel.belongsTo(AtributosModel, { foreignKey: "atributo_id"});