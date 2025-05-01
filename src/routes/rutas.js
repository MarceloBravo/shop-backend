import router from './login.routes.js'
import color from './color.routes.js'
import categoria from './categoria.routes.js'
import marca from './marca.routes.js'
import atributo from './atributo.routes.js'
import material from './material.routes.js'
import tallaLetra from './tallaLetra.routes.js'
import tallaNumero from './tallaNumero.routes.js'
import rol from './rol.routes.js'

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
];

export default rutas;
