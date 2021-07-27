<script lang="ts">
  import type { HotspotConfig } from "../utils/getConfig";

  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  export let hotspotConfig: HotspotConfig;
</script>

<div class="container">
  <TextInput bind:value={hotspotConfig.title}>Title</TextInput>
  <NumberInput bind:value={hotspotConfig.yaw}>Yaw</NumberInput>
  <NumberInput bind:value={hotspotConfig.pitch}>Pitch</NumberInput>
  <TextInput bind:value={hotspotConfig.extra_transforms}>Transforms</TextInput>
</div>

<style>
  .container {
    color: #fcfcfc;
    border: 5px solid #1b191c;
    padding: 8px 8px 4px 8px;
    background-color: #1b191c55;
    position: absolute;
    top: 40px;
    transform: translateX(-50%);
  }
</style>
