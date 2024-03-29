<script lang="ts">
  import equal from "fast-deep-equal";
  import DataHotspot from "./Variants/DataHotspot.svelte";
  import InfoHotspot from "./Variants/InfoHotspot.svelte";
  import SceneHotspot from "./Variants/SceneHotspot.svelte";
  import GrafanaData from "../Data/GrafanaData.svelte";
  import DraggableHotspot from "./DraggableHotspot.svelte";
  import HotspotEditor from "../Editors/HotspotEditor.svelte";
  import type { HotspotConfig } from "~/utils/getConfig";
  import {
    configStore,
    currentEditableHotspotStore,
    hotspotEditsStore,
    hotspotListEltStore,
    newHotspotStore,
  } from "~/stores";
  import { clickOutside } from "~/utils/clickOutside";
  import type { SceneData } from "~/utils/getSceneDataList";

  export let hotspotConfig: HotspotConfig;
  export let sceneDataList: SceneData[];
  export let index: number;

  const { editable } = customProperties;
  let editing = false;

  let hotspot: any;
  let hotspotElement: HTMLDivElement;

  const uneditedHotspotConfig = [
    ...$configStore.hotspots,
    ...$newHotspotStore,
  ].find((hotspot) => hotspot.hotspot_key == hotspotConfig.hotspot_key);

  $: editing = $currentEditableHotspotStore === hotspotConfig.hotspot_key;

  $: if (!editing && !equal(hotspotConfig, uneditedHotspotConfig))
    updateEdits();

  function findScene(sceneKey: number) {
    const scene = sceneDataList.find((scene) => scene.key == sceneKey);
    if (!scene) throw new Error(`Found no scene with key ${sceneKey}`);

    return scene;
  }

  function addHotspot(hotspotElement: HTMLElement) {
    const sceneKey = hotspotElement.dataset.sceneKey;

    if (!sceneKey) {
      console.warn("Missing scene key on", hotspotElement);
      return;
    }

    const scene = findScene(Number(sceneKey));

    hotspot = scene.scene.hotspotContainer().createHotspot(
      hotspotElement,
      {
        yaw: Number(hotspotElement.dataset.yaw),
        pitch: Number(hotspotElement.dataset.pitch),
      },
      {
        perspective: {
          extraTransforms: hotspotElement.dataset.extraTransforms,
        },
      }
    );
  }

  function updateEdits() {
    if (uneditedHotspotConfig && !equal(hotspotConfig, uneditedHotspotConfig)) {
      const edits = {};

      for (const key of Object.keys(hotspotConfig) as Array<
        keyof HotspotConfig
      >) {
        if (!(hotspotConfig[key] === uneditedHotspotConfig[key])) {
          edits[key] = hotspotConfig[key];
        }
      }

      if (!equal(edits, $hotspotEditsStore[hotspotConfig.hotspot_key])) {
        hotspotEditsStore.update((e) => ({
          ...e,
          [hotspotConfig.hotspot_key]: edits,
        }));
      }
    } else if ($hotspotEditsStore[hotspotConfig.hotspot_key]) {
      delete $hotspotEditsStore[hotspotConfig.hotspot_key];
      $hotspotEditsStore = $hotspotEditsStore; // Trigger an update
    }
  }

  function newposition(event: CustomEvent<{ yaw: number; pitch: number }>) {
    hotspotConfig = {
      ...hotspotConfig,
      ...event.detail,
    };
  }

  function onMouseDown() {
    if (editable) $currentEditableHotspotStore = hotspotConfig.hotspot_key;
  }

  function onOutsideClick() {
    if (editing) $currentEditableHotspotStore = null;
  }

  function hotspotClickOutside(node: HTMLDivElement) {
    clickOutside(node, { ignoreNodesStores: [hotspotListEltStore] });
  }
</script>

<div class="wrapper">
  <div
    data-scene-key={hotspotConfig.scene_key}
    data-hotspot-key={hotspotConfig.hotspot_key}
    data-yaw={hotspotConfig.yaw}
    data-pitch={hotspotConfig.pitch}
    data-extra-transforms={hotspotConfig.extra_transforms}
    class:editing
    class:editable
    style="z-index: {index};"
    use:addHotspot
    use:hotspotClickOutside
    bind:this={hotspotElement}
    on:mousedown={onMouseDown}
    on:outsideclick={onOutsideClick}
  >
    {#if hotspot}
      <DraggableHotspot
        {hotspot}
        editable={editable && editing}
        on:newposition={newposition}
      >
        {#if hotspotConfig.type == "metric"}
          <DataHotspot
            title={hotspotConfig.title}
            color={hotspotConfig.color}
            link={hotspotConfig.link}
            value={"No data"}
          >
            <tspan slot="title">{hotspotConfig.title}</tspan>
            <tspan slot="value">
              <GrafanaData
                alias={hotspotConfig.metric}
                unit={hotspotConfig.unit ?? undefined}
                decimals={hotspotConfig.decimals ?? undefined}
              />
            </tspan>
          </DataHotspot>
        {:else if hotspotConfig.type == "scene"}
          <SceneHotspot go_to_scene_key={hotspotConfig.go_to_scene_key} />
        {:else}
          <InfoHotspot />
        {/if}
      </DraggableHotspot>
      {#if editable && editing}
        <div class="editor-container">
          <HotspotEditor bind:hotspotConfig />
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .wrapper {
    display: none;
  }

  .editing {
    z-index: 1000000 !important;
  }

  .editable {
    cursor: pointer;
  }

  .editor-container {
    border: 5px solid #1b191c;
    background-color: #1b191c55;
    position: absolute;
    top: 40px;
    transform: translateX(-50%);
  }
</style>
