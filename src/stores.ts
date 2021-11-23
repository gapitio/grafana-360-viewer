import { derived, writable } from "svelte/store";
import {
  getConfig,
  HotspotConfig,
  SceneConfig,
  AreaConfig,
} from "./utils/getConfig";
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

export const uneditedAreaConfigListStore = derived(
  configStore,
  ({ areas }) => areas
);
export const uneditedSceneConfigListStore = derived(
  configStore,
  ({ scenes }) => scenes
);
export const uneditedHotspotConfigListStore = derived(
  configStore,
  ({ hotspots }) => hotspots
);

// AreaStores
export const areaEditsStore = writable<{
  [key: number]: Partial<AreaConfig>;
}>({});

export const areaConfigListEditsStore = derived(
  [uneditedAreaConfigListStore, areaEditsStore],
  ([areas, areaEdits]): AreaConfig[] =>
    areas.map((areaConfig) => ({
      ...areaConfig,
      ...areaEdits[areaConfig.area_key],
    }))
);

export const areaConfigListStore = derived(
  editable ? areaConfigListEditsStore : uneditedAreaConfigListStore,
  (areaConfig) => areaConfig
);

// HotspotStores
export const hotspotEditsStore = writable<{
  [key in number | string]: Partial<HotspotConfig>;
}>({});
export const newHotspotStore = writable<HotspotConfig[]>([]);

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

// SceneStores
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

export const sceneConfigListStore = derived(
  [
    editable ? sceneConfigListEditsStore : uneditedSceneConfigListStore,
    viewerStore,
  ],
  ([scenes, viewer]) => (viewer && scenes ? scenes : [])
);

export const currentSceneConfigStore = derived(
  [sceneConfigListStore, currentSceneKeyStore],
  ([sceneConfigList, sceneKey]) =>
    sceneConfigList.find((scene) => scene.scene_key === sceneKey)
);

export const sceneDataListStore = derived(
  [sceneConfigListStore, viewerStore],
  async ([sceneConfig, viewer]) =>
    viewer && sceneConfig ? await getSceneDataList(sceneConfig, viewer) : []
);

export const currentSceneDataStore = derived(
  [viewerStore, sceneDataListStore, currentSceneKeyStore],
  async ([viewer, sceneDataListPromise, currentSceneKey]) => {
    const sceneDataList = await sceneDataListPromise;

    if (!viewer || sceneDataList.length === 0) return;

    return sceneDataList.find((scene) => scene.key === currentSceneKey);
  }
);

export const currentEditableHotspotStore = writable<number | string | null>(
  null
);
export const currentTabStore = writable(1);

export const mouseCoordinates = writable({ pitch: 0, yaw: 0 });

export const hotspotListEltStore = writable<HTMLUListElement[]>([]);
