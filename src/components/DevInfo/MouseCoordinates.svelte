<script lang="ts">
  import { mouseCoordinates } from "~/stores";
  import Coordinates from "./Coordinates.svelte";

  $: pitch = $mouseCoordinates.pitch;
  $: yaw = $mouseCoordinates.yaw;
</script>

<div>
  <div>Mouse Coords</div>
  <Coordinates {pitch} {yaw} />
</div>
