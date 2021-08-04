<script lang="ts">
  import {
    currentAreaKeyStore,
    currentSceneKeyStore,
    hotspotConfigListStore,
    newScenesStore,
  } from "../../stores";
  import type { HotspotConfig } from "../../utils/getConfig";
  import TextInput from "../Inputs/TextInput.svelte";

  let value;

  function onClick() {
    console.log(value);
  }
</script>

<button on:click={onClick}>New area</button>
<div>
  <TextInput bind:value>Area name</TextInput>
</div>

<style>
</style>
