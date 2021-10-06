<script lang="ts">
  import Coordinates from "./Coordinates.svelte";

  export let viewer: any;

  let pitch: number = 0;
  let yaw: number = 0;

  const updateCoordinates = () => {
    pitch = viewer.view().pitch();
    yaw = viewer.view().yaw();
  };

  const onViewChange = () => {
    if (viewer.domElement().isConnected !== true) {
      viewer.removeEventListener("viewChange", onViewChange);
      return;
    }

    updateCoordinates();
  };

  viewer.addEventListener("viewChange", onViewChange);
</script>

<div>
  <div>View Coords</div>
  <Coordinates {pitch} {yaw} />
</div>
