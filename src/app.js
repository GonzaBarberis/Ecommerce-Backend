const express = require('express');
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const session = require('express-session')

const Rutas =  require('./routes/rutas.js') ;


const app = express();

//config
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


//midle
// app.use(morgan('dev'))

app.use(myConnection(mysql, { //conectamos con la db
    host: 'localhost',
    user: 'root',
    password: '123123',
    port: 3306,
    database: 'leomattiolimates'
}, 'single'))

app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


app.use('/', Rutas)

//static files
app.use(express.static(path.join(__dirname,'public')))

//start server
app.listen(4000, ()=>{
    console.log('El servidor está corriendo en el puerto 4000')
});