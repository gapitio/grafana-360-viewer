<script lang="ts">
  import { onDestroy } from "svelte";
  import { metricValues } from "./stores";
  import { getMetricValue } from "@gapit/grafana-metric";
  import PanoramaViewer from "./components/viewers/PanoramaViewer.svelte";

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
  <PanoramaViewer />
</main>
