'use strict';
import { sequelize } from '../../config/database.js';
import { defineRelations } from './relations.js';

// importar explícitamente todos los modelos
import AccionesPantallaModel from './AccionesPantallaModel.js';
import AtributosModel from './AtributosModel.js';
import AtributosProductoModel from './AtributosProductoModel.js';
import CategoriaModel from './CategoriaModel.js';
import ColorModel from './ColorModel.js';
import ColorProductoModel from './ColorProductoModel.js';
import DimensionesProductoModel from './DimensionesProductoModel.js';
import GeneroModel from './GeneroModel.js';
import MarcaModel from './MarcaModel.js';
import MaterialModel from './MaterialModel.js';
import MaterialProductoModel from './MaterialProductoModel.js';
import MenuModel from './MenuModel.js';
import MenuTiendaModel from './MenuTiendaModel.js';
import PantallaModel from './PantallaModel.js';
import PesoProductoModel from './PesoProductoModel.js';
import ProductoModel from './ProductoModel.js';
import RolModel from './RolModel.js';
import RolPermisosModel from './RolPermisosModel.js';
import SubCategoriaModel from './SubCategoriaModel.js';
import TallaLetraModel from './TallaLetraModel.js';
import TallaLetraProductoModel from './TallaLetraProductoModel.js';
import TallaNumericaModel from './TallaNumericaModel.js';
import TallaNumericaProductoModel from './TallaNumericaProductoModel.js';
import TipoDimensionesModel from './TipoDimensionesModel.js';
import UsuarioModel from './UsuarioModel.js';
import ValoracionProductoModel from './ValoracionProductoModel.js';

const initializeDatabase = () => {
  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = sequelize.Sequelize;

  // asignar modelos al objeto db
  db.AccionesPantallaModel = AccionesPantallaModel;
  db.AtributosModel = AtributosModel;
  db.AtributosProductoModel = AtributosProductoModel;
  db.CategoriaModel = CategoriaModel;
  db.ColorModel = ColorModel;
  db.ColorProductoModel = ColorProductoModel;
  db.DimensionesProductoModel = DimensionesProductoModel;
  db.GeneroModel = GeneroModel;
  db.MarcaModel = MarcaModel;
  db.MaterialModel = MaterialModel;
  db.MaterialProductoModel = MaterialProductoModel;
  db.MenuModel = MenuModel;
  db.MenuTiendaModel = MenuTiendaModel;
  db.PantallaModel = PantallaModel;
  db.PesoProductoModel = PesoProductoModel;
  db.ProductoModel = ProductoModel;
  db.RolModel = RolModel;
  db.RolPermisosModel = RolPermisosModel;
  db.SubCategoriaModel = SubCategoriaModel;
  db.TallaLetraModel = TallaLetraModel;
  db.TallaLetraProductoModel = TallaLetraProductoModel;
  db.TallaNumericaModel = TallaNumericaModel;
  db.TallaNumericaProductoModel = TallaNumericaProductoModel;
  db.TipoDimensionesModel = TipoDimensionesModel;
  db.UsuarioModel = UsuarioModel;
  db.ValoracionProductoModel = ValoracionProductoModel;

  // definir relaciones
  defineRelations(db);

  return db;
};

const db = initializeDatabase();

export default db;
