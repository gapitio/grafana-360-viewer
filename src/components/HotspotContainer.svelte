<script lang="ts">
  import HotspotWrapper from "./HotspotWrapper.svelte";
  import type { HotspotConfig } from "../utils/getConfig";

  export let hotspotConfigList: HotspotConfig[];
  export let currentSceneKey: number;
  export let viewer: any;
  export let scenes: { name: string; key: number; scene: any }[] = [];
</script>

{#each hotspotConfigList as hotspotConfig}
  {#if hotspotConfig.scene_key == currentSceneKey}
    <HotspotWrapper {currentSceneKey} {hotspotConfig} {viewer} {scenes} />
  {/if}
{/each}
