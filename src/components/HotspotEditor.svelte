<script lang="ts">
  import type { HotspotConfig } from "../utils/getConfig";

  import NumberInput from "./Inputs/NumberInput.svelte";
  import TextInput from "./Inputs/TextInput.svelte";

  export let hotspotConfig: HotspotConfig;
</script>

<div class="container">
  <NumberInput bind:value={hotspotConfig.hotspot_key}>hotspot_key</NumberInput>
  <NumberInput bind:value={hotspotConfig.scene_key}>scene_key</NumberInput>
  <NumberInput bind:value={hotspotConfig.area_key}>area_key</NumberInput>
  <TextInput bind:value={hotspotConfig.type}>type</TextInput>
  <TextInput bind:value={hotspotConfig.title}>title</TextInput>
  <TextInput bind:value={hotspotConfig.description}>description</TextInput>
  <TextInput bind:value={hotspotConfig.metric}>metric</TextInput>
  <TextInput bind:value={hotspotConfig.unit}>unit</TextInput>
  <TextInput bind:value={hotspotConfig.color}>color</TextInput>
  <NumberInput bind:value={hotspotConfig.go_to_scene_key}
    >go_to_scene_key</NumberInput
  >
  <NumberInput bind:value={hotspotConfig.yaw}>yaw</NumberInput>
  <NumberInput bind:value={hotspotConfig.pitch}>pitch</NumberInput>
  <TextInput bind:value={hotspotConfig.extra_transforms}
    >extra_transforms</TextInput
  >
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
