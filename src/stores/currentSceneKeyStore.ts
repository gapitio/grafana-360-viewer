import { derived } from "svelte/store";
import { dataStore } from "./dataStore";

function getCurrentSceneKey() {
  return Number(
    getTemplateSrv().replace(`$${customProperties.templateVariables.scene}`)
  );
}

function updateCurrentSceneKey(value: number): void {
  getLocationSrv().update({
    query: {
      [`var-scene`]: value,
    },
    partial: true,
  });
}

export const currentSceneKeyStore = {
  subscribe: derived(dataStore, getCurrentSceneKey).subscribe,
  update: updateCurrentSceneKey,
};
