<script lang="ts">
  import { onDestroy } from "svelte";
  import { InfluxDB } from "@influxdata/influxdb-client-browser";

  export let url: string;
  export let token: string;
  export let organization: string;
  export let query: string;

  let value = "No data";

  console.log(url, token, organization, query);

  const influxDB = new InfluxDB({ url, token });
  const queryApi = influxDB.getQueryApi(organization);

  function queryData(fluxQuery: string) {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        if (o.example) {
          value = o._value;
        } else {
          value = "No data";
        }
      },
      error(error) {
        value = "No data";
      },
      complete() {},
    });
  }

  const queryInterval = setInterval(() => queryData(query), 500);

  onDestroy(() => {
    clearInterval(queryInterval);
  });
</script>

<tspan>{value}</tspan>
