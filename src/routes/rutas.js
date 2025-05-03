import router from './login.routes.js'
import color from './color.routes.js'
import categoria from './categoria.routes.js'
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

const rutas = [
    {path: '/', router},
    {path: '/color', router: color},
    {path: '/categoria', router: categoria},
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
];

export default rutas;
