import router from './login.routes.js'
import color from './color.routes.js'
import categoria from './categoria.routes.js'
import marca from './marca.routes.js'
import atributo from './atributo.routes.js'
import material from './material.routes.js'

const rutas = [
    {path: '/login', router},
    {path: '/color', router: color},
    {path: '/categoria', router: categoria},
    {path: '/marca', router: marca},
    {path: '/atributo', router: atributo},
    {path: '/materiales', router: material}
];

export default rutas;
