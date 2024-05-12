### Crear grupo de gastos

POST /api/groups/spendings/


```
{
    "name": "nombre de grupo"
}

```

### Agregar miembro al grupo de gastos:

POST /api/groups/spendings/:id_del_grupo/members

```
{
    "_id": "id del usuario",
    "name": "nombre de usuario"
}

```

### Info del grupo:

GET /api/groups/spendings/:id_del_grupo