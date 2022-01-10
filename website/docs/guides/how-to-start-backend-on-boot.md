---
id: how-to-start-backend-on-boot
title: How to start backend on boot
---

By default the current backend will stop when docker is restarted and has to be manually started after. Instead of manually starting it you can add a [restart policy](https://docs.docker.com/engine/reference/run/#restart-policies---restart) to the containers in the docker-compose file.

Add the 3 highlighted lines shown below into the `docker-compose.yml` file in the backend folder.

`docker-compose.yml`

```yaml {6,19,32}
version: "3"

services:
  grafana-360-viewer-postgres:
    image: postgres:13
    restart: always # THIS LINE
    ports:
      - 3201:5432
    volumes:
      - ./sql/init/:/docker-entrypoint-initdb.d
      - ./postgres:/var/lib/postgresql/data:rw
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: postgres_password

  grafana-360-viewer-postgrest:
    image: postgrest/postgrest:v8.0.0
    restart: always # THIS LINE
    environment:
      PGRST_DB_URI: postgres://app_user:postgres_password@grafana-360-viewer-postgres:5432/app_db
      PGRST_DB_SCHEMA: api
      PGRST_DB_ANON_ROLE: web_anon
      PGRST_SERVER_PROXY_URI: http://localhost:3202
      PGRST_SERVER_PORT: 3202
      PGRST_JWT_SECRET: jwt_secret_needs_to_be_32_or_more_letters
    depends_on:
      - grafana-360-viewer-postgres

  grafana-360-viewer-backend:
    image: nginx:1.21.3-alpine
    restart: always # THIS LINE
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    ports:
      - 3203:8080
    depends_on:
      - grafana-360-viewer-postgrest

networks:
  default:
    external: true
    name: grafana
```
