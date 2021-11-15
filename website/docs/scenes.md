---
id: scenes
title: Scenes
---

:::note
Creating a new scene will directly save it in the database.
:::

:::caution
Creating a scene without being in an area will make it "invisible".
:::

## Options

### Scene name

The scene name.

### Area key

_This will be set to the area selected when creating a new scene._

:::caution
Changing this can make it "invisible". Make sure to only change it to an area that exists.
:::

The area the scene is contained.

### Facing pitch

The direction the viewer will look when first loaded (left/right).

### Facing yaw

The direction the viewer will look when first loaded (up/down).

### FOV

The field of view.

How much of the scene can be seen at once.

### File ID

The ID of the image used. ID is the ID from the database. The first image uploaded to the database is 1.

:::note
Adding a new image will directly save it in the database and the `File ID` will be changed to the new image's ID.
:::
