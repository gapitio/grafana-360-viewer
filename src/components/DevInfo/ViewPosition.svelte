<script lang="ts">
  import { viewerStore } from "~/stores";

  let yaw: number | null = null;

  function updateYaw() {
    yaw = $viewerStore.view().yaw();
  }

  $: $viewerStore && $viewerStore.view() && updateYaw();
</script>

<div>Yaw: {yaw}</div>
