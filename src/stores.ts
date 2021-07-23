import { derived, writable } from "svelte/store";
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

export const currentSceneKeyStore = (() => {
  const getCurrentSceneKey = () =>
    Number(
      getTemplateSrv().replace(`$${customProperties.templateVariables.scene}`)
    );

  const setCurrentSceneKey = (value: number): void =>
    getLocationSrv().update({
      query: {
        [`var-scene`]: value,
      },
      partial: true,
    });

  const { set, subscribe, update } = writable(getCurrentSceneKey());

  return {
    set,
    subscribe,
    update,
    setKey: setCurrentSceneKey,
    updateKey: () => set(getCurrentSceneKey()),
  };
})();

export const areaEditsStore = writable({});

export const hotspotEditsStore = writable({});
export const newHotspotStore = writable({});

export const hotspotConfigListEditsStore = derived(
  [configStore, hotspotEditsStore],
  ([$configStore, $sceneEditsStore]): HotspotConfig[] =>
    $configStore.scenes.map((sceneConfig) => ({
      ...sceneConfig,
      ...$sceneEditsStore[sceneConfig.scene_key],
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

export const sceneEditsStore = writable({});
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
  ([$sceneConfigStore, $viewerStore]) => {
    return $viewerStore && $sceneConfigStore
      ? getSceneDataList($sceneConfigStore, $viewerStore)
      : [];
  }
);

export const currentSceneDataStore = derived(
  [viewerStore, sceneDataListStore, currentSceneKeyStore],
  ([$viewerStore, $sceneDataListStore, $currentSceneKeyStore]) => {
    if (!$viewerStore || $sceneDataListStore.length === 0) return;

    const scene = $sceneDataListStore.find(
      (scene) => scene.key === $currentSceneKeyStore
    );

    return scene;
  }
);
