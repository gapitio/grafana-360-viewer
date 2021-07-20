<script lang="ts">
  import EditableSceneList from "./EditableSceneList.svelte";
  import SceneEditor from "./SceneEditor.svelte";
  import DraggableHorizontally from "./DraggableHorizontally.svelte";

  let width = 400;
</script>

<div class="scene-container" style={`width: ${width}px`}>
  <EditableSceneList />
  <SceneEditor />
  <DraggableHorizontally bind:width />
</div>

<style>
  .scene-container {
    position: absolute;
    top: 0;
    left: 0;

    max-height: 100%;

    display: flex;
    flex-direction: column;
  }
</style>
