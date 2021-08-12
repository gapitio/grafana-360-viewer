<script lang="ts">
  import {
    currentAreaKeyStore,
    areaConfigListEditsStore,
    areaEditsStore,
  } from "../../stores";
  import AreaItem from "./AreaItem.svelte";
  import SaveButton from "../SaveButton.svelte";
  import { getFullAPIPath } from "../../utils/apiPath";
  import { update } from "../../utils/update";
  import NewArea from "../NewArea.svelte";

  $: selectedArea = $areaConfigListEditsStore.find(
    (sceneConfig) => sceneConfig.area_key == $currentAreaKeyStore
  )
    ? $currentAreaKeyStore
    : null;

  async function saveFunc() {
    const {
      api: { token },
    } = customProperties;

    Promise.all(
      Object.entries($areaEditsStore).map(async ([areaKey, areaConfig]) => {
        const url = new URL(`${getFullAPIPath()}areas`);
        url.searchParams.append("area_key", `eq.${areaKey}`);

        try {
          return fetch(url.href, {
            method: "PATCH",
            body: JSON.stringify(areaConfig),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Prefer: "return=representation",
            },
          });
        } catch (err) {
          return console.error(err);
        }
      })
    ).then(() => update());
  }
</script>

<div>
  <ul>
    {#each $areaConfigListEditsStore as areaConfig}
      <AreaItem bind:selectedArea {areaConfig} />
    {/each}
  </ul>
</div>

<NewArea />
<SaveButton {saveFunc} />

<style>
  div {
    color: #fcfcfc;
    overflow-y: auto;
    flex: 1;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
