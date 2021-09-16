<script lang="ts">
  import { areaEditsStore, currentEditableHotspotStore } from "../../stores";

  import type { HotspotConfig } from "../../utils/getConfig";
  import HotspotEditor from "../Editors/HotspotEditor.svelte";

  export let hotspotConfig: HotspotConfig;

  $: isActive = hotspotConfig.hotspot_key == $currentEditableHotspotStore;
  $: isEdited = hotspotConfig.hotspot_key in $areaEditsStore;
</script>

<li>
  <label class:active={isActive} class:edited={isEdited}>
    <input
      type="radio"
      value={hotspotConfig.hotspot_key}
      bind:group={$currentEditableHotspotStore}
    />
    ({hotspotConfig.hotspot_key})
  </label>
  {#if isActive}
    <HotspotEditor {hotspotConfig} />
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
