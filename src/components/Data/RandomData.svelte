<script lang="ts">
  import { onDestroy } from "svelte";

  let value = "No data";

  const queryInterval = setInterval(
    () => (value = (Math.random() * 100).toFixed(2)),
    500
  );

  onDestroy(() => {
    clearInterval(queryInterval);
  });
</script>

<tspan>{value}</tspan>
