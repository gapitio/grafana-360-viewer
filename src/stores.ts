import { derived, writable } from "svelte/store";
import { getConfig } from "./utils/getConfig";
import { getSceneDataList } from "./utils/getSceneDataList";

export const dataStore = writable(data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewerStore = writable<any>();
export const configStore = writable(getConfig());

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

export const sceneDataListStore = derived(
  [configStore, viewerStore],
  ([$configStore, $viewerStore]) =>
    $viewerStore && $configStore
      ? getSceneDataList($configStore, $viewerStore)
      : []
);

export const currentSceneDataStore = derived(
  [viewerStore, sceneDataListStore, currentSceneKeyStore],
  ([$viewerStore, $sceneDataListStore, $currentSceneKeyStore]) => {
    if (!$viewerStore || $sceneDataListStore.length === 0) return;

    const scene = $sceneDataListStore.find(
      (scene) => scene.key === $currentSceneKeyStore
    );

    if (!scene)
      throw new Error(`Found no scene with key ${$currentSceneKeyStore}`);

    return scene;
  }
);

export const editsStore = writable();
