const controller = {}
const bcrypt = require('bcrypt')


controller.index = (req, res) =>{
    //res.render("index", {title : 'Inicio', nombre: req.session.name})
    if (req.session.register == true){
        res.render('login', {error:'',nombre: req.session.name})
    }
    else{
        //res.redirect('/')
        res.render("index", {title : 'Inicio', nombre: req.session.name})
    }
    
}



controller.list = (req, res) =>{

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM productos', (err, rows)=>{
            if (err){
                res.json(err); //o next(err)
            }
            res.render('shop',{ //le manda a customers.ejs
                data:rows
            , nombre: req.session.name})
        })
    })
    
}

controller.view = (req, res) =>{
    const id = req.params.id

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM productos WHERE id = ?', [id], (err, rows)=>{
            res.render('buy', {
                data:rows[0], nombre: req.session.name
            })
        })
    })
}

controller.register = (req, res) =>{    
    if (req.session.entro != true){
        res.render('register', {error:'',nombre: req.session.name})
    }
    else{
        res.redirect('/')
    }
}

controller.saveUser = (req, res) =>{
    const data = req.body

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM users WHERE email = ?',[data.email],(err, rows)=>{
            if (err){
                res.json(err); //o next(err)
            }
            else{
                if (rows.length > 0){
                    console.log('ENTRA')
                    res.render("register", {error : 'El usuario ya está registrado',nombre: req.session.name})
                }
                else{
                    bcrypt.hash(data.password, 10).then(hash=>{
                        data.password = hash
                        req.getConnection((err, conn)=>{
                            conn.query('INSERT INTO users set ?',[data],(err, rows)=>{
                                if (err){
                                    res.json(err); //o next(err)
                                }
                                else{
                                    req.session.entro = true
                                    req.session.register = true
                                    req.session.name = rows.nombre
                                    res.redirect('/')
                                }
                            })
                        })
                    })
                }
            }
        })
    })
}



controller.login = (req, res) =>{
    if (req.session.entro != true){
        res.render('login', {error:'',nombre: req.session.name})
    }
    else{
        res.redirect('/')
    }
}

controller.auth = (req, res) =>{
    const data = req.body
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM users WHERE email = ?',[data.email],(err, rows)=>{
            if (err){
                res.json(err); //o next(err)
            }
            else{
                if (rows.length > 0){
                    rows.forEach(element => {
                        bcrypt.compare(data.password, element.password, (err, match) =>{
                            if (!match){
                                res.render("login", {error : 'La contraseña es incorrecta',nombre: req.session.name})
                            }
                            else{
                                console.log('welcome')
                                req.session.entro = true; 
                                req.session.register = false
                                req.session.name = element.nombre
                                res.redirect('/')
                            }
                        })
                    });
                }
                else{
                    res.render("login", {error : 'El usuario no existe',nombre: req.session.name})
                }
            }
        })
    })
}


controller.logout = (req, res) =>{
    if (req.session.entro == true){
        req.session.destroy()
        //res.send('Sesion cerrada con éxito')
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
}


controller.purchase = (req, res) =>{

    if (req.session.entro == true){
        let random = Math.random() * 9999999

        const fecha = new Date();
        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1
        let año = fecha.getFullYear()

        let tiempo = año + '-' + mes + '-' + dia 

        const id = req.params.id

        req.getConnection((err, conn)=>{
            conn.query('SELECT * FROM productos WHERE id = ?',[id],(err, rows)=>{
                if (err){
                    res.json(err); //o next(err)
                }
                else{
                    info = rows[0]
                    req.getConnection((err, conn)=>{
                        conn.query(`INSERT INTO ventas set usuario = '${req.session.name}', producto = '${rows[0].nombre}', numOrden = ${Math.floor(random)}, fecha = '${tiempo}'`,(err, rows)=>{
                            if (err){
                                res.json(err); //o next(err)
                            }
                            else{
                                res.render('purchase', {error:'',nombre: req.session.name, orden: Math.floor(random), data: info})
                            }
                        })
                    }) 
                }
            })
        }) 
    }
    else{
        res.render("login", {error : 'Debes iniciar sesión para comprar.',nombre: req.session.name})
    }
}

module.exports = controller