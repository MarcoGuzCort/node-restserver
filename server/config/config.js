//=============
// puerto
//=============

process.env.PORT = process.env.PORT || 3000

//=============
// Entorno
//Si es desarrollo o prodution
//=============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============
// BD
//=============

let urlDB;

if (process.env.NODE_ENV === 'dev') {

  urlDB = 'mongodb://localhost:27017/cafe'

} else {
  urlDB = 'mongodb://cafe-user:asd123123@ds113522.mlab.com:13522/cafe'
}

process.env.URLDB = urlDB;
