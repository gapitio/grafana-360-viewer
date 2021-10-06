<script lang="ts">
  import InfoItem from "./InfoItem.svelte";

  export let viewer: any;

  let fov: number = 0;
  let height: number = 0;
  let width: number = 0;

  const updateCoordinates = () => {
    fov = viewer.view().fov();
    height = viewer.view().height();
    width = viewer.view().width();
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
  <InfoItem label="Fov" value={((fov * 180) / Math.PI).toFixed(1)} />
  <InfoItem label="Height" value={height + "px"} />
  <InfoItem label="Width" value={width + "px"} />
</div>

<style>
  div {
    width: 110px;
  }
</style>
