<script lang="ts">
  import { sceneConfigListEditsStore, currentSceneKeyStore } from "../stores";

  $: selectedScene = $currentSceneKeyStore;
  $: currentSceneKeyStore.setVariable(selectedScene);
</script>

<div class="scene-list">
  <ul>
    {#each $sceneConfigListEditsStore as sceneConfig}
      <li>
        <label class={sceneConfig.scene_key == selectedScene ? "active" : ""}
          ><input
            type="radio"
            bind:group={selectedScene}
            value={sceneConfig.scene_key}
          />
          {sceneConfig.scene_name}</label
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  .scene-list {
    color: #fcfcfc;
    overflow-y: auto;
  }
  .scene-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .scene-list label {
    background-color: #1b191c55;
    display: block;
    padding: 10px 16px;
  }
  .scene-list label:hover {
    background-color: #1b191ce0;
  }
  .scene-list label.active {
    background-color: #1b191cbb;
  }
</style>
