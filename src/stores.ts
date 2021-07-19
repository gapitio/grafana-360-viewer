import { writable } from "svelte/store";
import { getConfig } from "./utils/getConfig";
import type { SceneData } from "./utils/getSceneDataList";

export const dataStore = writable(data);

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

export const sceneDataListStore = writable<SceneData[]>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewerStore = writable<any>();
