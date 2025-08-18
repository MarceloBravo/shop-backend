import { defineRelations } from '../../../src/models/relations.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';
import { AtributosProductoModel } from '../../../src/models/AtributosProductoModel.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';
import { ColorProductoModel } from '../../../src/models/ColorProductoModel.js';
import { ColorModel } from '../../../src/models/ColorModel.js';
import { MaterialProductoModel } from '../../../src/models/MaterialProductoModel.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';
import { TallaLetraProductoModel } from '../../../src/models/TallaLetraProductoModel.js';
import { TallaLetraModel } from '../../../src/models/TallaLetraModel.js';
import { TallaNumericaProductoModel } from '../../../src/models/TallaNumericaProductoModel.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { DimensionesProductoModel } from '../../../src/models/DimensionesProductoModel.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { PesoProductoModel } from '../../../src/models/PesoProductoModel.js';
import { ValoracionProductoModel } from '../../../src/models/ValoracionProductoModel.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';
import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { RolPermisosModel } from '../../../src/models/RolPermisosModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { MenuModel } from '../../../src/models/MenuModel.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

// Initialize relations
export default defineRelations({
    ProductoModel,
    AtributosProductoModel,
    AtributosModel,
    ColorProductoModel,
    ColorModel,
    MaterialProductoModel,
    MaterialModel,
    TallaLetraProductoModel,
    TallaLetraModel,
    TallaNumericaProductoModel,
    TallaNumericaModel,
    DimensionesProductoModel,
    TipoDimensionesModel,
    PesoProductoModel,
    ValoracionProductoModel,
    SubCategoriaModel,
    GeneroModel,
    MarcaModel,
    UsuarioModel,
    RolModel,
    RolPermisosModel,
    AccionesPantallaModel,
    PantallaModel,
    MenuModel,
    CategoriaModel
});