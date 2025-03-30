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
