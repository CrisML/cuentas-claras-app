### Registrarse

POST /api/login/

```
{
    "username": "alexis",
    "password": "alexis",
    "name": "Alexis name",
    "spending_limit": 10000
}
```

### Iniciar sesion

POST /api/signup/

```
{
    "username": "alexis",
    "password": "alexis"
}

```

### Crear grupo

POST /api/groups/


```
{
    "name": "nombre de grupo",
    "type": "spendings or savings"
}

```

### Agregar miembro al grupo de gastos:

POST /api/groups/:id_del_grupo/members

```
{
    "user_id": "id del usuario",
    "name": "nombre de usuario"
}

```

### Agregar gasto al grupo:

POST /api/groups/:id_del_grupo/spendings

```
{
    "user_id": "663d3d56be4234a687765d9f",
    "description": "comida",
    "amount": 2500
}

```

### Info del grupo:

GET /api/groups/:id_del_grupo