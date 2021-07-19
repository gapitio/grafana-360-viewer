import { derived } from "svelte/store";
import { getSceneDataList } from "../utils/getSceneDataList";
import { configStore } from "./configStore";
import { viewerStore } from "./viewerStore";

export const sceneDataListStore = derived(
  [configStore, viewerStore],
  ([$configStore, $viewerStore]) => {
    if ($viewerStore) return getSceneDataList($configStore, $viewerStore);
    else return [];
  }
);
