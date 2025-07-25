import router from './login.routes.js'
import color from './color.routes.js'
import categoria from './categoria.routes.js'
import subCategoria from './subCategoria.routes.js'
import marca from './marca.routes.js'
import atributo from './atributo.routes.js'
import material from './material.routes.js'
import tallaLetra from './tallaLetra.routes.js'
import tallaNumero from './tallaNumero.routes.js'
import rol from './rol.routes.js'
import pantalla from './pantalla.routes.js'
import tipoDimensiones from './tipoDimensiones.routes.js'
import usuario from './usuario.routes.js'
import genero from './genero.routes.js'
import producto from './producto.routes.js'
import valoracionProducto from './valoracionProducto.routes.js'
import accionesPantalla from './accionesPantalla.routes.js'
import menu from './menu.routes.js'
import rolPermisos from './rolPermisos.routes.js'
import menuTienda from './menuTienda.routes.js'


const rutas = [
    {path: '/', router},
    {path: '/color', router: color},
    {path: '/categoria', router: categoria},
    {path: '/sub_categoria', router: subCategoria},
    {path: '/marca', router: marca},
    {path: '/atributo', router: atributo},
    {path: '/materiales', router: material},
    {path: '/tallaLetra', router: tallaLetra},
    {path: '/tallaNumero', router: tallaNumero},
    {path: '/rol', router: rol},
    {path: '/pantalla', router: pantalla},
    {path: '/tipo_dimensiones', router: tipoDimensiones},
    {path: '/usuario', router: usuario},
    {path: '/genero', router: genero},
    {path: '/producto', router: producto},
    {path: '/valoracion_producto', router: valoracionProducto},
    {path: '/acciones_pantalla', router: accionesPantalla},
    {path: '/menu', router: menu},
    {path: '/rol_permisos', router: rolPermisos},
    {path: '/menu_tienda', router: menuTienda},
];

export default rutas;
