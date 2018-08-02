Correr Proyecto


Correr Mongo en container docker


Crear usuario Mongo, ir al directorio mongo/docker-entrypoint-initdb.d y modificar el archivo cafe.js ingresando el usuario y password a utilizar para la base de datos domergy_app.





db.createUser(
   {
     user: "marco",
     pwd: "123123",
     roles: [{ role: 'readWrite', db:'cafe'}]
   }
);


Ubicados en la raiz del proyecto ejecutar en terminal


docker run --name domergy_mongo -v $(pwd)/mongo/data:/data/db -v $(pwd)/mongo/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d/ -e MONGO_INITDB_DATABASE=cafe_node -p 27017:27017 -d mongo
