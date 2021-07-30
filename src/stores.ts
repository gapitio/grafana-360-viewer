import { derived, get, writable } from "svelte/store";
import { getConfig, HotspotConfig, SceneConfig } from "./utils/getConfig";
import { getSceneDataList } from "./utils/getSceneDataList";

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

const createVariableKeyStore = (variable: string) => {
  const getKey = () => Number(getTemplateSrv().replace(`$${variable}`));

  const setKey = (value: number): void =>
    getLocationSrv().update({
      query: {
        [`var-${variable}`]: value,
      },
      partial: true,
    });

  const updateKey = () => {
    const currentKey = getKey();
    if (currentKey != get(currentSceneKeyStore)) set(currentKey);
  };

  const { set, subscribe, update } = writable(getKey());

  return {
    set,
    subscribe,
    update,
    setKey,
    updateKey,
  };
};

export const currentAreaKeyStore = createVariableKeyStore(
  customProperties.templateVariables.area
);

export const currentSceneKeyStore = createVariableKeyStore(
  customProperties.templateVariables.scene
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
    customProperties.editable
      ? hotspotConfigListEditsStore
      : uneditedHotspotConfigListStore,
    viewerStore,
  ],
  ([hotspotConfig, viewer]) => (viewer && hotspotConfig ? hotspotConfig : [])
);

export const sceneEditsStore = writable<{
  [key: number]: Partial<SceneConfig>;
}>({});
export const newScenesStore = writable([]);

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
    customProperties.editable
      ? sceneConfigListEditsStore
      : uneditedSceneConfigListStore,
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

export const imageURLObjectsStore = (() => {
  const clear = () => {
    for (const imageURLObject of Object.values(get(imageURLObjectsStore))) {
      URL.revokeObjectURL(imageURLObject);
    }
    set({});
  };

  const { set, subscribe, update } = writable<{ [key: number]: string }>({});
  return {
    set,
    subscribe,
    update,
    clear,
  };
})();
