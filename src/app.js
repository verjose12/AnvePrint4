const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql2 = require('mysql2/promise');
const session = require('express-session'); // Importa express-session
const MySQLStore = require('express-mysql-session')(session); // Importa express-mysql-session
const configura = require('./configdb');
const app = express();

//importing routes
const usuariosRoutes = require('./routes/usuarios');

//settings

//app.set('PORT', process.env.PORT|| 3001);
// Configuración de EJS como motor de plantillas, 
app.set('view engine', 'ejs');
//buscar en automatico las vistas en la carpeta "views":
app.set('views', path.join(__dirname, 'views'));

//middlewares

app.use(morgan('dev'));

const sessionStore = new MySQLStore({
  // Configura los detalles de conexión a la base de datos
  host: configura.db_host,
  user: configura.db_user,
  password: configura.db_password,
  database: configura.db_database,
  port: configura.db_port,
}, mysql2.createPool); // Usa createPool de mysql2


// Configura las opciones de sesión
app.use(session({
  secret: 'root95093',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));


//configuracion en servidor para conectar con metodo POST
app.use(express.urlencoded({extended: false}));

//routes

app.use('/', usuariosRoutes);

//statics file
app.use(express.static(path.join(__dirname, 'public')));

//coneccion servidor
app.listen(configura.PORT, () => {
  console.log(`Servidor escuchando en esta ruta http://localhost:${configura.PORT}`);
});
