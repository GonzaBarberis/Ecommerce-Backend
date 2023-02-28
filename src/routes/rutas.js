const express = require('express');
const router = express.Router();

const productosContoller = require('../controllers/productosController')

//router.get("/", (req, res) => res.render("index", {title : 'Inicio'}));
router.get('/', productosContoller.index)


router.get("/about", (req, res) => res.render("about", {title : 'Nosotros', nombre: req.session.name}));

router.get('/shop', productosContoller.list) //mostrar los productos

router.get('/buy/:id', productosContoller.view) //comprar algun productos

router.get('/login', productosContoller.login)
router.post('/login', productosContoller.auth)

router.get('/register', productosContoller.register)
router.post('/register', productosContoller.saveUser)

router.get('/logout', productosContoller.logout)

router.get('/purchase/:id', productosContoller.purchase)

// router.post('/buyed', productosContoller.buyed)

module.exports = router;
