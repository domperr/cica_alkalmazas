const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var mysql = require('mysql');
  var connection;

  function db_connect() {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cica_db'
    });
  
    connection.connect();
  }

  app.get('/film', (req, res) => {
    db_connect();
    connection.query('SELECT * from film', function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.get('/cica', (req, res) => {
    db_connect();
    connection.query('SELECT * from cica', function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.get('/cica1', (req, res) => {
    db_connect();
    connection.query('SELECT * from cica where cica_allapot = 0', function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.get('/cica2', (req, res) => {
    db_connect();
    connection.query('SELECT * from cica where cica_allapot = 1', function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.get('/cica3', (req, res) => {
    db_connect();
    connection.query('SELECT * from cica where cica_allapot = 2', function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.post('/keres', (req, res) => {
    db_connect();
    var p = 'SELECT * from cica where cica_datum like "%' + req.body.bevitel1 + '%"';
    connection.query(p, function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.post('/keres1', (req, res) => {
    db_connect();
    var p = 'SELECT * from cica where cica_allapot = 0 and cica_datum like "%' + req.body.bevitel1 + '%"';
    connection.query(p, function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.post('/keres2', (req, res) => {
    db_connect();
    var p = 'SELECT * from cica where cica_allapot = 1 and cica_datum like "%' + req.body.bevitel1 + '%"';
    connection.query(p, function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.post('/keres3', (req, res) => {
    db_connect();
    var p = 'SELECT * from cica where cica_allapot = 2 and cica_datum like "%' + req.body.bevitel1 + '%"';
    connection.query(p, function (err, rows, fields) {
      if (err) throw err;

      console.log(rows);
      res.send(rows);
    });

    connection.end();
  });

  app.post('/erdekel', (req, res) => {
    db_connect();
    var p = 'INSERT INTO erdekel VALUES (NULL, ' + req.body.bevitel1 + ')';
    connection.query(p, function (err, rows, fields) {
      if (err)
        res.send("Hiba");
      else
        res.send("Sikeres");
    });

    connection.end();
  });

  app.post('/uzenetek', (req, res) => {
    db_connect();
    var p = 'INSERT INTO uzenetek (uzenet) VALUES ("' + req.body.bevitel1 + '")';
    connection.query(p, function (err, rows, fields) {
      if (err)
        res.send("Hiba");
      else
        res.send("Sikeres");
    });
  
    connection.end();
  });
  
};
