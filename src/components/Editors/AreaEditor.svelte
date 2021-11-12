<script lang="ts">
  import equal from "fast-deep-equal";

  import { headers } from "~/utils/apiHeaders";
  import TextInput from "../Inputs/TextInput.svelte";

  import {
    areaConfigListStore,
    areaEditsStore,
    currentAreaKeyStore,
    uneditedAreaConfigListStore,
  } from "~/stores";

  import type { AreaConfig } from "~/utils/getConfig";
  import { getFullAPIPath } from "~/utils/apiPath";
  import DeleteButton from "../DeleteButton.svelte";
  import EditorContainer from "./EditorContainer.svelte";

  export let areaConfig: AreaConfig;

  $: currentAreaIndex = $areaConfigListStore.findIndex(
    (area) => area.area_key == areaConfig.area_key
  );

  $: {
    const uneditedAreaConfig = $uneditedAreaConfigListStore[currentAreaIndex];

    if (!equal(areaConfig, uneditedAreaConfig)) {
      const edits = Object.fromEntries(
        Object.keys(areaConfig)
          .filter((key) => areaConfig[key] !== uneditedAreaConfig[key])
          .map((key) => [key, areaConfig[key]])
      );

      const areaConfigEdits = $areaEditsStore[areaConfig.area_key];
      if (!equal(areaConfigEdits, edits))
        areaEditsStore.update((e) => ({
          ...e,
          ...{ [areaConfig.area_key]: edits },
        }));
    } else if ($areaEditsStore[areaConfig.area_key]) {
      delete $areaEditsStore[areaConfig.area_key];
      $areaEditsStore = $areaEditsStore; // Trigger an update
    }
  }

  function deleteFunc() {
    const url = new URL(`${getFullAPIPath()}areas`);
    url.searchParams.append("area_key", `eq.${areaConfig.area_key}`);
    fetch(url.href, {
      method: "DELETE",
      headers,
    })
      .then(() => {
        const areas = $uneditedAreaConfigListStore;
        let areaKey: number | string = "";

        if (areas.length > currentAreaIndex + 1)
          areaKey = areas[currentAreaIndex + 1].area_key;
        else if (areas.length > 2)
          areaKey = areas[currentAreaIndex - 1].area_key;

        currentAreaKeyStore.setVariable(areaKey);
      })
      .catch((err) => console.error(err));
  }
</script>

<EditorContainer>
  <TextInput bind:value={areaConfig.area_name}>Area name</TextInput>
  <DeleteButton {deleteFunc} />
</EditorContainer>
