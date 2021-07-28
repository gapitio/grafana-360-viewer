<script lang="ts">
  export let alias: string | null;

  import { dataStore } from "../../stores";
  import { getMetricValue } from "@gapit/grafana-metric";

  let value: unknown = "No data";

  dataStore.subscribe((_run) => {
    if (!alias) return;

    value = getMetricValue(alias, { noDataValue: "No data" });

    if (typeof value == "number") {
      value = Number(value).toFixed(2);
    }
  });
</script>

<tspan class="grafana-value">{value}</tspan>
