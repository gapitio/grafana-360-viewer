<script lang="ts">
  import type { SceneConfig } from "../utils/getConfig";

  export let sceneConfigList: SceneConfig[];
  export let currentSceneKey: number;
</script>

<div class="scene-list">
  <ul>
    {#each sceneConfigList as sceneConfig}
      <li>
        <label class={sceneConfig.scene_key == currentSceneKey ? "active" : ""}
          ><input
            type="radio"
            bind:group={currentSceneKey}
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
