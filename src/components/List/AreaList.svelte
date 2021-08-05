<script lang="ts">
  import { currentAreaKeyStore, configStore } from "../../stores";

  $: selectedArea = $currentAreaKeyStore;
  $: currentAreaKeyStore.setVariable(selectedArea);
</script>

<div class="scene-list">
  <ul>
    {#each $configStore.areas as areaConfig}
      <li>
        <label class={areaConfig.area_key == selectedArea ? "active" : ""}
          ><input
            type="radio"
            bind:group={selectedArea}
            value={areaConfig.area_key}
          />
          ({areaConfig.area_key})
          {areaConfig.area_name}</label
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  .scene-list {
    color: #fcfcfc;
    overflow-y: auto;
    flex: 1;
  }
  .scene-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .scene-list label {
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
