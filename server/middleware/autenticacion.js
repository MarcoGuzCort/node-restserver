const jwt = require('jsonwebtoken');

//===============
// Verificar token
//===============


let verificarToken = (req, res, next) => {

  let token = req.get('token')

  jwt.verify(token, process.env.SEED, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido'
        }
      })
    }

    req.usuario = decoded.usuario;
    next();

  })


}


//==============
// Verifica Admin role
//==============

let verificaAdminRole = (req, res, next) => {

  let usuario = req.usuario;

if ( usuario.role === 'ADMIN_ROLE') {
  next()
  return
}else {
  return res.status(401).json({
    ok: false,
    err: {
      message: 'Usuario no es ADMIN'
    }
  })

}



}

module.exports = {

  verificarToken,
  verificaAdminRole
}
