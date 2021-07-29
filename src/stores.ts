import { derived, get, writable } from "svelte/store";
import { getConfig, HotspotConfig, SceneConfig } from "./utils/getConfig";
import { getSceneDataList } from "./utils/getSceneDataList";

export const dataStore = writable(data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewerStore = writable<any>();
export const configStore = writable(getConfig());
export const sceneConfigStore = derived(
  configStore,
  ($configStore) => $configStore.scenes
);
export const hotspotConfigStore = derived(
  configStore,
  ($configStore) => $configStore.hotspots
);

const createVariableKeyStore = (variable: string) => {
  const getKey = () => Number(getTemplateSrv().replace(`$${variable}`));

  const setKey = (value: number): void =>
    getLocationSrv().update({
      query: {
        [`var-scene`]: value,
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
  [configStore, hotspotEditsStore, newHotspotStore],
  ([$configStore, $hotspotEditsStore, $newHotspotStore]): HotspotConfig[] =>
    [...$configStore.hotspots, ...$newHotspotStore].map((hotspotConfig) => ({
      ...hotspotConfig,
      ...$hotspotEditsStore[hotspotConfig.hotspot_key],
    }))
);

export const hotspotConfigListStore = derived(
  [
    customProperties.editable
      ? hotspotConfigListEditsStore
      : hotspotConfigStore,
    viewerStore,
  ],
  ([$hotspotConfigStore, $viewerStore]) =>
    $viewerStore && $hotspotConfigStore ? $hotspotConfigStore : []
);

export const sceneEditsStore = writable<{
  [key: number]: Partial<SceneConfig>;
}>({});
export const newScenesStore = writable([]);

export const sceneConfigListEditsStore = derived(
  [configStore, sceneEditsStore],
  ([$configStore, $sceneEditsStore]): SceneConfig[] =>
    $configStore.scenes.map((sceneConfig) => ({
      ...sceneConfig,
      ...$sceneEditsStore[sceneConfig.scene_key],
    }))
);

export const sceneDataListStore = derived(
  [
    customProperties.editable ? sceneConfigListEditsStore : sceneConfigStore,
    viewerStore,
  ],
  async ([$sceneConfigStore, $viewerStore]) => {
    return $viewerStore && $sceneConfigStore
      ? await getSceneDataList($sceneConfigStore, $viewerStore)
      : [];
  }
);

export const currentSceneDataStore = derived(
  [viewerStore, sceneDataListStore, currentSceneKeyStore],
  async ([$viewerStore, $sceneDataListStore, $currentSceneKeyStore]) => {
    if (!$viewerStore || (await $sceneDataListStore).length === 0) return;

    const scene = (await $sceneDataListStore).find(
      (scene) => scene.key === $currentSceneKeyStore
    );

    return scene;
  }
);

export const imageURLObjectsStore = (() => {
  const clear = () => {
    for (const imageURLObject of Object.values(get(imageURLObjectsStore))) {
      URL.revokeObjectURL(imageURLObject);
    }
    set({});
  };

  const { set, subscribe, update } = writable<{ [key: string]: string }>({});
  return {
    set,
    subscribe,
    update,
    clear,
  };
})();
