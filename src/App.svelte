<script lang="ts">
  import { onDestroy } from "svelte";
  import { dataStore } from "./stores";
  import PanoramaViewer from "./components/Viewers/PanoramaViewer.svelte";

  function onPanelUpdate() {
    dataStore.update(() => data);
  }

  htmlNode.addEventListener("panelupdate", onPanelUpdate);
  onDestroy(() => {
    htmlNode.removeEventListener("panelupdate", onPanelUpdate);
  });
</script>

<main>
  <PanoramaViewer />
</main>
