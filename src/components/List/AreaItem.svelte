<script lang="ts">
  import AreaEditor from "../Editors/AreaEditor.svelte";

  import { areaEditsStore, currentAreaKeyStore } from "../../stores";

  import type { AreaConfig } from "../../utils/getConfig";

  export let areaConfig: AreaConfig;
  export let selectedArea: number;

  $: isActive = areaConfig.area_key == selectedArea;
  $: isEdited = areaConfig.area_key in $areaEditsStore;
</script>

<li>
  <label class:active={isActive} class:edited={isEdited}>
    <input
      type="radio"
      bind:group={selectedArea}
      value={areaConfig.area_key}
      on:change={() => currentAreaKeyStore.setVariable(areaConfig.area_key)}
    />
    ({areaConfig.area_key})
    {areaConfig.area_name}
  </label>
  {#if isActive}
    <AreaEditor {areaConfig} />
  {/if}
</li>

<style>
  label {
    display: block;
    padding: 10px 16px;
    height: 22px;
    position: relative;
  }
  label:hover {
    background-color: #1b191ce0;
  }
  label.active {
    background-color: #1b191cbb;
  }
  label.edited {
    font-style: italic;
  }
</style>
