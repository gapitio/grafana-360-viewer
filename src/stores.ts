import { derived, writable } from "svelte/store";
import { getConfig, HotspotConfig, SceneConfig } from "./utils/getConfig";
import { getSceneDataList } from "./utils/getSceneDataList";
import { createTemplateVariableStore } from "./utils/templateVariable";

const {
  editable,
  templateVariables: { area, autoRotate, scene },
} = customProperties;

export const currentAreaKeyStore = createTemplateVariableStore(area, true);
export const currentSceneKeyStore = createTemplateVariableStore(scene, true);
export const autoRotateStore = createTemplateVariableStore(autoRotate, false);

export const dataStore = writable(data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewerStore = writable<any>();
export const configStore = writable(getConfig());

export const uneditedSceneConfigListStore = derived(
  configStore,
  ({ scenes }) => scenes
);
export const uneditedHotspotConfigListStore = derived(
  configStore,
  ({ hotspots }) => hotspots
);

export const areaEditsStore = writable({});

export const hotspotEditsStore = writable<{
  [key: number]: Partial<HotspotConfig>;
}>({});
export const newHotspotStore = writable([]);

export const hotspotConfigListEditsStore = derived(
  [uneditedHotspotConfigListStore, hotspotEditsStore, newHotspotStore],
  ([hotspots, hotspotEdits, newHotspots]): HotspotConfig[] =>
    [...hotspots, ...newHotspots].map((hotspotConfig) => ({
      ...hotspotConfig,
      ...hotspotEdits[hotspotConfig.hotspot_key],
    }))
);

export const hotspotConfigListStore = derived(
  [
    editable ? hotspotConfigListEditsStore : uneditedHotspotConfigListStore,
    viewerStore,
  ],
  ([hotspotConfig, viewer]) => (viewer && hotspotConfig ? hotspotConfig : [])
);

export const sceneEditsStore = writable<{
  [key: number]: Partial<SceneConfig>;
}>({});

export const sceneConfigListEditsStore = derived(
  [uneditedSceneConfigListStore, sceneEditsStore],
  ([scenes, sceneEdits]): SceneConfig[] =>
    scenes.map((sceneConfig) => ({
      ...sceneConfig,
      ...sceneEdits[sceneConfig.scene_key],
    }))
);

export const sceneDataListStore = derived(
  [
    editable ? sceneConfigListEditsStore : uneditedSceneConfigListStore,
    viewerStore,
  ],
  async ([sceneConfig, viewer]) => {
    return viewer && sceneConfig
      ? await getSceneDataList(sceneConfig, viewer)
      : [];
  }
);

export const currentSceneDataStore = derived(
  [viewerStore, sceneDataListStore, currentSceneKeyStore],
  async ([viewer, sceneDataListPromise, currentSceneKey]) => {
    const sceneDataList = await sceneDataListPromise;

    if (!viewer || sceneDataList.length === 0) return;

    return sceneDataList.find((scene) => scene.key === currentSceneKey);
  }
);
