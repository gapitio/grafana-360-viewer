<script lang="ts">
  import equal from "fast-deep-equal";

  import NumberInput from "../Inputs/NumberInput.svelte";
  import TextInput from "../Inputs/TextInput.svelte";

  import {
    areaConfigListStore,
    areaEditsStore,
    currentAreaKeyStore,
    uneditedAreaConfigListStore,
  } from "../../stores";

  import type { AreaConfig } from "../../utils/getConfig";
  import { getFullAPIPath } from "../../utils/apiPath";
  import DeleteButton from "../DeleteButton.svelte";

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
    } else if ($areaEditsStore[areaConfig.area_key])
      $areaEditsStore =
        delete $areaEditsStore[areaConfig.area_key] && $areaEditsStore;
  }

  function deleteFunc() {
    const {
      api: { authorizationHeader },
    } = customProperties;

    const url = new URL(`${getFullAPIPath()}areas`);
    url.searchParams.append("area_key", `eq.${areaConfig.area_key}`);
    fetch(url.href, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
        Prefer: "return=representation",
      },
    })
      .then(() => {
        const areas = $uneditedAreaConfigListStore;
        let areaKey = null;

        if (areas.length > currentAreaIndex + 1)
          areaKey = areas[currentAreaIndex + 1].area_key;
        else if (areas.length > 2)
          areaKey = areas[currentAreaIndex - 1].area_key;

        console.log(areaKey);

        currentAreaKeyStore.setVariable(areaKey);
      })
      .catch((err) => console.error(err));
  }
</script>

<div class="container">
  <TextInput bind:value={areaConfig.area_name}>Area name</TextInput>
  <DeleteButton {deleteFunc} />
</div>

<style>
  .container {
    color: #fcfcfc;
    border-bottom: 2px solid black;
    padding: 8px 8px 4px 8px;
  }
</style>
