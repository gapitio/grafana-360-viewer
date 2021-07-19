import { writable } from "svelte/store";

function getCurrentSceneKey() {
  return Number(
    getTemplateSrv().replace(`$${customProperties.templateVariables.scene}`)
  );
}

function setCurrentSceneKey(value: number): void {
  getLocationSrv().update({
    query: {
      [`var-scene`]: value,
    },
    partial: true,
  });
}

function createCurrentSceneKeyStore() {
  const { set, subscribe, update } = writable(getCurrentSceneKey());

  return {
    set,
    subscribe,
    update,
    setKey: setCurrentSceneKey,
    updateKey: () => set(getCurrentSceneKey()),
  };
}

export const currentSceneKeyStore = createCurrentSceneKeyStore();
