<script lang="ts">
  import {
    configStore,
    currentEditableHotspotStore,
    hotspotEditsStore,
    newHotspotStore,
    sceneConfigListEditsStore,
  } from "~/stores";
  import { headers } from "~/utils/apiHeaders";
  import { getFullAPIPath } from "~/utils/apiPath";
  import type { HotspotConfig } from "~/utils/getConfig";
  import { update } from "~/utils/update";
  import ColorPicker from "../Inputs/ColorPicker.svelte";
  import DeleteButton from "../DeleteButton.svelte";

  import NumberInput from "../Inputs/NumberInput.svelte";
  import SelectInput from "../Inputs/SelectInput.svelte";
  import TextInput from "../Inputs/TextInput.svelte";
  import EditorContainer from "./EditorContainer.svelte";

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

  function deleteFunc() {
    $currentEditableHotspotStore = null;
    const isNewHotspot = typeof hotspotConfig.hotspot_key == "string";
    if (isNewHotspot) {
      $newHotspotStore = $newHotspotStore.filter(
        (v) => v.hotspot_key !== hotspotConfig.hotspot_key
      );
      delete $hotspotEditsStore[hotspotConfig.hotspot_key];
      $hotspotEditsStore = $hotspotEditsStore;
      $configStore = $configStore; // force update
    } else {
      const url = new URL(`${getFullAPIPath()}hotspots`);
      url.searchParams.append("hotspot_key", `eq.${hotspotConfig.hotspot_key}`);
      fetch(url.href, {
        method: "DELETE",
        headers,
      })
        .then(() => update())
        .catch((err) => console.error(err));
    }
  }
</script>

<EditorContainer>
  <NumberInput bind:value={hotspotConfig.scene_key} min={1}>
    Scene key
  </NumberInput>
  <NumberInput bind:value={hotspotConfig.area_key} min={1}>Area key</NumberInput
  >
  <SelectInput bind:value={hotspotConfig.type} items={typeItems}>
    Type
  </SelectInput>
  <TextInput bind:value={hotspotConfig.title}>Title</TextInput>
  <TextInput bind:value={hotspotConfig.description}>Description</TextInput>
  <NumberInput bind:value={hotspotConfig.decimals}>Decimals</NumberInput>
  <TextInput bind:value={hotspotConfig.metric}>Metric</TextInput>
  <TextInput bind:value={hotspotConfig.unit}>Unit</TextInput>
  <ColorPicker bind:value={hotspotConfig.color} />
  <SelectInput
    bind:value={hotspotConfig.go_to_scene_key}
    items={goToSceneKeyItems()}
  >
    Go to scene key
  </SelectInput>
  <NumberInput bind:value={hotspotConfig.yaw} step={0.1}>Yaw</NumberInput>
  <NumberInput bind:value={hotspotConfig.pitch} step={0.1}>Pitch</NumberInput>
  <TextInput bind:value={hotspotConfig.extra_transforms}>
    Extra transforms
  </TextInput>
  <TextInput bind:value={hotspotConfig.link}>Link</TextInput>
  <DeleteButton {deleteFunc} />
</EditorContainer>
