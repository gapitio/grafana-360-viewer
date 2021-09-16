<script lang="ts">
  export let alias: string | null;
  export let unit = "";
  export let decimals = 1;

  import { dataStore } from "../../stores";
  import { getMetricValue } from "@gapit/grafana-metric";

  let value: unknown = "No data";
  let init = true;

  $: if (alias) {
    if (!init) updateValue();
    // Don't trigger updateValue on init
    init = false;
  }

  function updateValue() {
    if (!alias) return;

    const metricValue = getMetricValue(alias, { noDataValue: "No data" });

    if (typeof metricValue == "number")
      value = `${metricValue.toFixed(decimals)} ${unit}`;
    else value = "No data";
  }

  dataStore.subscribe(updateValue);
</script>

<tspan class="grafana-value">{value}</tspan>
