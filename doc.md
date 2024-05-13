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
    "_id": "id del usuario",
    "name": "nombre de usuario"
}

```

### Info del grupo:

GET /api/groups/:id_del_grupo