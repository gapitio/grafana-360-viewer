---
id: how-to-change-password
title: How to change password
---

:::tip
A simple unix command to generate a 32 characters long password.

```bash
< /dev/urandom tr -dc A-Za-z0-9 | head -c32
```

:::

## PostgREST password and token

:::info
Secret and password is the same thing.
:::

1.  Generate a 32 characters long password.
2.  Copy the generated password.
3.  Go to the docker-compose.yml file (in the backend folder) and replace the password in `PGRST_JWT_SECRET` with the generated password.
4.  Go to [jwt.io](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.KFeX7N9kDtl_eKSvltG_4oS56nfs1KILZsg7IMzYPCs).
5.  Change the payload to

```json
{
  "role": "editor"
}
```

6. Paste the password in secret (should say "your-256-bit-secret")
   ![JWT Generator](../../static/img/screenshot-jwt-generator.png)
7. Copy the token
   ![JWT Generator copy](../../static/img/screenshot-jwt-generator-copy.png)
8. Paste the generated token in the token.txt file

## Postgres password

1. Generate a password.
2. Replace the password in `POSTGRES_PASSWORD` with the password.
3. Replace the password in `PGRST_DB_URI`. Make sure to only replace the `postgres_password` in `postgres://app_user:postgres_password@grafana-360-viewer-postgres:5432/app_db`.
