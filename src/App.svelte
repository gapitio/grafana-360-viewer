<script lang="ts">
  import { onDestroy } from "svelte";
  import { metricValues } from "./stores";
  import { getMetricValue } from "@gapit/grafana-metric";

  function getValues() {
    return customProperties.values.map((valueDict) => {
      const { name, metricName, decimals, baseUnit } = valueDict;
      const value = getMetricValue(metricName);

      return {
        name,
        value:
          value == null
            ? "No data"
            : `${Number(value).toFixed(decimals)} ${baseUnit}`,
      };
    });
  }

  function onPanelUpdate() {
    metricValues.update(() => getValues());
  }

  htmlNode.addEventListener("panelupdate", onPanelUpdate);
  onDestroy(() => {
    htmlNode.removeEventListener("panelupdate", onPanelUpdate);
  });
</script>

<main>
  {#each Object.values($metricValues) as { name, value }}
    <h1>{name}: {value}</h1>
  {/each}
</main>

<style type="text/scss">
  $color: #ff3e00;
  main {
    text-align: center;
  }

  h1 {
    color: $color;
    font-weight: 400;
  }
</style>
