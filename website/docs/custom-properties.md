---
id: custom-properties
title: Custom properties
---

## editable

Adds the sidebar, coords to the viewer and editors to make areas, scenes and hotspots editable.

## isGrafana

:::caution
If this is false and in a Grafana panel then some stuff like saving doesn't work.
:::

Tells the code if it's in a Grafana panel or not.

## hideEditImages

Makes the edit images not show to save some space in the sidebar.

## templateVariables

The Grafana variables used.

Syntax: `${variable name}`

### area

The area variable.

### scene

The scene variable.

### scene

The scene variable.

### autoRotate

The autoRotate variable.

## api

### url

The url the backend is. For Grafana it's `/api/datasources/proxy/datasource-id/`.

[How to get the datasource id](./setup.mdx#get-the-data-source-id).

### token

The JWT token used to authenticate the backend.

The api token from the `token.txt` file.

Should look similar to this `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.rmY5Aa45BN09clJ2h703tRggNbyDx9wtS_GQiPRNthg`, but with a few differences.
