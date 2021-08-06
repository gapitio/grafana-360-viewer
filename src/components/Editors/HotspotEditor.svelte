<script lang="ts">
  import { sceneConfigListEditsStore } from "../../stores";
  import type { HotspotConfig } from "../../utils/getConfig";
  import ColorPicker from "../ColorPicker.svelte";

  import NumberInput from "../Inputs/NumberInput.svelte";
  import SelectInput from "../Inputs/SelectInput.svelte";
  import TextInput from "../Inputs/TextInput.svelte";

  export let hotspotConfig: HotspotConfig;

  const goToSceneKeyItems = () =>
    $sceneConfigListEditsStore.map(({ scene_key, scene_name }) => ({
      label: `(${scene_key}) ${scene_name}`,
      value: scene_key,
    }));

  const typeItems = [
    { label: "metric", value: "metric" },
    { label: "scene", value: "scene" },
    { label: "info", value: "info" },
  ];
</script>

<div class="container">
  <NumberInput bind:value={hotspotConfig.hotspot_key}>hotspot_key</NumberInput>
  <NumberInput bind:value={hotspotConfig.scene_key}>scene_key</NumberInput>
  <NumberInput bind:value={hotspotConfig.area_key}>area_key</NumberInput>
  <SelectInput bind:value={hotspotConfig.type} items={typeItems}
    >type</SelectInput
  >
  <TextInput bind:value={hotspotConfig.title}>title</TextInput>
  <TextInput bind:value={hotspotConfig.description}>description</TextInput>
  <TextInput bind:value={hotspotConfig.metric}>metric</TextInput>
  <TextInput bind:value={hotspotConfig.unit}>unit</TextInput>
  <ColorPicker bind:value={hotspotConfig.color} />
  <SelectInput
    bind:value={hotspotConfig.go_to_scene_key}
    items={goToSceneKeyItems()}>go_to_scene_key</SelectInput
  >
  <NumberInput bind:value={hotspotConfig.yaw} step={0.1}>yaw</NumberInput>
  <NumberInput bind:value={hotspotConfig.pitch} step={0.1}>pitch</NumberInput>
  <TextInput bind:value={hotspotConfig.extra_transforms}
    >extra_transforms</TextInput
  >
  <TextInput bind:value={hotspotConfig.link}>link</TextInput>
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