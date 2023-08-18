const controller ={};

controller.list = async (req, res) => {
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const [usuarios] = await conn.query('SELECT * FROM usuarios'); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('index', {
        data: usuarios,
      });
    } catch (err) {
      res.json(err);
    }
  };

//Metodo para registrar usuario
controller.save = async (req, res) => {
    const data = req.body;
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      await conn.query('INSERT INTO usuarios SET ?', [data]); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('usuario/perfiluser');
    } catch (err) {
      res.json(err);
    }
  };
    /*console.log(req.body); //recibimos los datos a traves de este objeto req.body
    res.render('admin')*/


// Función para mostrar la vista de registro
controller.mostrarRegistro = (req, res) => {
    res.render('registro');
};

// Función para mostrar la vista de AnvePrint.ejs
controller.mostrarAnve = (req, res) => {
    res.render('AnvePrint');
};
// Función para mostrar la vista de index.ejs
controller.mostrarindex = (req, res) => {
    res.render('index');
};
// Función para mostrar la vista de login
controller.mostrarlogin = (req, res) => {
    res.render('login');
};

// Función para mostrar la vista de perfiluser.ejs
controller.mostraruser = (req, res) => {
    res.render('usuario/perfiluser');
};

// Función para mostrar la vista de perfiluser.ejs
controller.mostrarcarrito = (req, res) => {
    res.render('carritoIndex');
};

// Función para mostrar la vista de Catalogo1.ejs
controller.mostrarcatalogo = (req, res) => {
    res.render('Catalogos/Catalogo1');
};

// Función para mostrar la vista de Catalogo1.ejs
controller.mostrarcatalogo2 = (req, res) => {
    res.render('Catalogos/Catalogo2');
};
// Función para mostrar la vista de Catalogo1.ejs
controller.mostrarcatalogo3 = (req, res) => {
    res.render('Catalogos/Catalogo3');
};

// Función para mostrar la vista de tabla2.ejs
controller.mostrarTabla2 = async (req, res) => {
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const query = 'SELECT * FROM usuarios';
      const [usuarios] = await conn.query(query); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('tablausers', {
        data: usuarios, // Pasa la variable 'data' a la vista
      });
    } catch (err) {
      res.json(err);
    }
  };
  
  // Método para mostrar la vista de tabla1.ejs
  controller.mostrarTabla1 = async (req, res) => {
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const query = 'SELECT * FROM pedidos';
      const [pedidos] = await conn.query(query); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('tablapedidos', {
        data: pedidos, // Pasa la variable 'data' a la vista
      });
    } catch (err) {
      res.json(err);
    }
  };
  
  // Método para mostrar la vista de admin.ejs
  controller.mostrarAdmin = async (req, res) => {
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const query = 'SELECT * FROM productos';
      const [productos] = await conn.query(query); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('admin', {
        data: productos, // Pasa la variable 'data' a la vista
      });
    } catch (err) {
      res.json(err);
    }
  };
  

//metodo para ingresar al perfil
controller.autenticarLogin = (req, res) => {
    const { correo, contrasena } = req.body;

    // Realiza la autenticación aquí, por ejemplo, consultando la base de datos
    // ...

    // Si la autenticación es exitosa, redirige a la página de perfil (por ejemplo)
    res.redirect('admin'); // Cambia '/perfil' a la ruta que deseas redirigir después del inicio de sesión exitoso
};

//Funcion para mostrar admin.ejs esta funcion va de la mano con la funcion debajo
controller.mostrarAdmin = async (req, res) => {
    try {
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const query = 'SELECT * FROM productos';
      const [productos] = await conn.query(query); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.render('admin', {
        data: productos, // Pasa la variable 'data' a la vista
      });
    } catch (err) {
      res.json(err);
    }
  };
  

//Metodo post insertar producto a la tabla productos de admin
controller.insertarProducto = async (req, res) => {
    try {
      const { nombre, descripcion, precio } = req.body;
  
      const conn = await mysql2.createConnection(configura); // Crear conexión
  
      const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
      const result = await conn.query(query, [nombre, descripcion, precio]); // Ejecutar consulta
  
      await conn.end(); // Cerrar conexión
  
      res.redirect('/admin'); // Redirecciona a la página de admin después de la inserción
    } catch (err) {
      res.json(err);
    }
  };
  

module.exports = controller;
