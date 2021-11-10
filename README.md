# CONEXAGRAM - Backend

## Introducción

Implementación del backend para el desafío de Conexa.
La idea es exponer algunos endpoints que nos permitan:

- Crear una cuenta con nombre / email / password
- Loguearse en la aplicación con email / password
- Utilizando el usuario actualmente logueado:
  - Obtener el listado de fotos

## Seteo del entorno
Antes que nada, debemos instalar las dependencias definidas en el archivo `package.json`

```bash
npm install
```

## Correr el server

- Crear archivo `.env` con la config necesaria para el entorno (copiar de `.env.example` y modificar)
- Crear `<user>` y `<password>` para db especificada en `.env`
- Correr el server

Correr en modo desarrollo (se requiere nodemon)
```bash
npm run dev
```

Correr en modo producción
```bash
npm start
```
## Endpoints

Estos son los endpoints disponibles:

## Registrar de un nuevo usuario
```
  POST /api/auth/new
```

enviando en el body los siguientes datos requeridos:

```json
{
  "email": "usuario@example.com",
  "password": "mi-password",
  "name": "nombre"
}
```
El endpoint validará los datos requeridos y retornará la información de el/los campos faltantes:

```json
{
    "ok": false,
    "errors": {
        "name": {
            "msg": "El nombre es obligatorio",
            "param": "name",
            "location": "body"
        },
        "email": {
            "msg": "El email es obligatorio",
            "param": "email",
            "location": "body"
        },
        "password": {
            "msg": "El password debe de ser de 6 caracteres",
            "param": "password",
            "location": "body"
        }
    }
}
```

## Autenticación
```
  POST /api/auth/
```

y en el body del request enviamos los siguientes datos:

```json
{
  "email": "usuario@example.com",
  "password": "mi-password"
}
```

Si las credenciales son correctas, el endpoint retornará la siguiente información del usuario:

```json
{
    "ok": true,
    "uid": "6189087d47f9b20cf85f37ef",
    "name": "ruth",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTg5MDg3ZDQ3ZjliMjBjZjg1ZjM3ZWYiLCJuYW1lIjoicnV0aCIsImlhdCI6MTYzNjM3MDYyMSwiZXhwIjoxNjM2NjI5ODIxfQ.te6L5B7Vq_dD0BTNwyVj9KU8Zzok7ILSaS4qI5WgXo8"
}
```

En caso de que las credenciales sean inválidas, devuelve un 401 con el siguiente detalle:
```json
{
    "ok": false,
    "msg": "Datos incorrectos"
}
```

## Endpoints con autenticación

Para que el backend sepa quién efectúa el request, debemos pasarle de alguna forma el access token generado al momento del login.

En los requests que necesitan un usuario autenticado, enviamos el access token en el header `x-access-token`

```
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTg5MDg3ZDQ3ZjliMjBjZjg1ZjM3ZWYiLCJuYW1lIjoicnV0aCIsImlhdCI6MTYzNjM4MDU2NSwiZXhwIjoxNjM2NjM5NzY1fQ.aPxehnEQrtN_NjdSnwY1Sb_3E6bIbX9bx5jswelu9dk
```

## Fotos

### Obtener listado de fotos
```
  GET /api/photos
```

La cual devolverá un listado de 10 fotos y el total de las mismas en la base de datos:
```json
{
    "count": 5000,
    "results": [
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        }
    ]
}
```
Este endpoint puede recibir dos parametros en la query `limit` y `offset`. 

  - limit: es para establecer la cantidad de fotos que se retornan
  - offset: se puede usar para moverse a la siguiente pagina.

```
  GET /api/photos/?limit=25&offset=50
```

Por defecto, retorna las primeras 10 fotos


## DEMO
[Link](https://conexagram.herokuapp.com) del demo corriendo en Heroku