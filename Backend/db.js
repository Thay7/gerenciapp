const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Tkff0105+',
  database: 'estoque',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

module.exports = pool.promise();
