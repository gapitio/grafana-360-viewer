<script lang="ts">
  import {
    sceneConfigListEditsStore,
    currentSceneKeyStore,
  } from "../../stores";
  import SceneItem from "./SceneItem.svelte";

  $: selectedScene = $sceneConfigListEditsStore.find(
    (sceneConfig) => sceneConfig.scene_key == $currentSceneKeyStore
  )
    ? $currentSceneKeyStore
    : null;
</script>

<div>
  <ul>
    {#each $sceneConfigListEditsStore as sceneConfig}
      <SceneItem bind:selectedScene {sceneConfig} />
    {/each}
  </ul>
</div>

<style>
  div {
    color: #fcfcfc;
    overflow-y: auto;
    flex: 1;
  }
  div ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
