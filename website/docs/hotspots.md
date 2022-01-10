---
id: hotspots
title: Hotspots
---

:::caution
Creating a scene without being in an area and a scene will make it "invisible".
:::

:::note
The hotspot will only be saved in the database after pressing save.
:::

## Options

### Scene key

:::caution
Changing this can make it "invisible". Make sure to only change it to a scene that exists.
:::

The scene the hotspot is contained.

### Area key

:::caution
Changing this can make it "invisible". Make sure to only change it to an area that exists.
:::

The area the hotspot is contained.

### Type

#### Metric

Hotspot that shows a metric value.

#### Scene

Hotspot that can switch between scenes by clicking it.

#### Info

### Description

### Decimals

Decimals for the metric value.

### Metric

:::note
The metric/query name must be on the panel the hotspot is displayed at.
:::

The metric/query name.

### Unit

The suffix for the metric/query value.

### Color

The color for the metric hotspot outline.

### Go to scene key

The scene key the scene hotspot should switch between.

### Yaw

The hotspot position (up/down)

### Pitch

The hotspot position (left/right)

### Extra transforms

:::note
This effect only works after saving.
:::

Adds transforms to the hotspot. Rotations and translates ETC. `rotateZ(90deg) translateX(40px)` will rotate it 90 degrees in the Z axis and 40px in the X axis.

### Link

A link to go to when a metric hotspot is clicked. Useful for going to a different Grafana dashboard.
